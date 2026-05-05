from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from zipfile import ZipFile

import pandas as pd
import requests


@dataclass(frozen=True)
class StaticGtfs:
    stops: pd.DataFrame
    trips: pd.DataFrame
    stop_times: pd.DataFrame

    @classmethod
    def empty(cls) -> "StaticGtfs":
        return cls(
            stops=pd.DataFrame(columns=["stop_id", "stop_name"]),
            trips=pd.DataFrame(columns=["trip_id", "route_id", "direction_id"]),
            stop_times=pd.DataFrame(columns=["trip_id", "stop_id", "stop_sequence", "arrival_time"]),
        )

    @classmethod
    def from_zip(cls, path: str | Path) -> "StaticGtfs":
        with ZipFile(path) as zf:
            return cls(
                stops=pd.read_csv(zf.open("stops.txt"), dtype=str),
                trips=pd.read_csv(zf.open("trips.txt"), dtype=str),
                stop_times=pd.read_csv(zf.open("stop_times.txt"), dtype=str),
            )

    @classmethod
    def from_url(cls, url: str, destination: Path) -> "StaticGtfs":
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        destination.write_bytes(response.content)
        return cls.from_zip(destination)

    def trip_route(self, trip_id: str | None) -> tuple[str | None, int | None]:
        if not trip_id or self.trips.empty:
            return None, None
        matches = self.trips.loc[self.trips["trip_id"] == trip_id]
        if matches.empty:
            return None, None
        row = matches.iloc[0]
        direction = row.get("direction_id")
        return row.get("route_id"), int(direction) if pd.notna(direction) and direction != "" else None

    def stop_name(self, stop_id: str | None) -> str | None:
        if not stop_id or self.stops.empty:
            return None
        matches = self.stops.loc[self.stops["stop_id"] == stop_id]
        if matches.empty:
            return None
        return str(matches.iloc[0].get("stop_name"))

    def scheduled_arrival_seconds(self, trip_id: str | None, stop_id: str | None) -> int | None:
        if not trip_id or not stop_id or self.stop_times.empty:
            return None
        matches = self.stop_times.loc[
            (self.stop_times["trip_id"] == trip_id) & (self.stop_times["stop_id"] == stop_id)
        ]
        if matches.empty:
            return None
        return parse_gtfs_time(str(matches.iloc[0].get("arrival_time")))


def parse_gtfs_time(value: str) -> int | None:
    if not value or value == "nan":
        return None
    parts = value.split(":")
    if len(parts) != 3:
        return None
    hours, minutes, seconds = [int(part) for part in parts]
    return hours * 3600 + minutes * 60 + seconds
