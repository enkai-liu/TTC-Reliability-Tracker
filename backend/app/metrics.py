from __future__ import annotations

from datetime import datetime

import pandas as pd
from sqlalchemy.orm import Session

from app.models import VehiclePositionRecord

ON_TIME_EARLY_SECONDS = -60
ON_TIME_LATE_SECONDS = 300


def time_of_day_bucket(timestamp: datetime) -> str:
    hour = timestamp.hour
    if 6 <= hour < 10:
        return "morning_peak"
    if 10 <= hour < 15:
        return "midday"
    if 15 <= hour < 19:
        return "evening_peak"
    if 19 <= hour < 24:
        return "evening"
    return "overnight"


def compute_metrics(records: pd.DataFrame) -> pd.DataFrame:
    if records.empty:
        return pd.DataFrame(
            columns=[
                "route_id",
                "station_name",
                "direction_id",
                "time_of_day",
                "observation_count",
                "avg_delay_seconds",
                "avg_headway_seconds",
                "on_time_rate",
            ]
        )

    df = records.copy()
    df = df.dropna(subset=["route_id", "station_name"])
    if df.empty:
        return compute_metrics(pd.DataFrame())

    df["observed_at"] = pd.to_datetime(df["observed_at"], utc=True)
    df["time_of_day"] = df["observed_at"].dt.hour.map(_bucket_from_hour)
    df["is_on_time"] = df["delay_seconds"].between(ON_TIME_EARLY_SECONDS, ON_TIME_LATE_SECONDS)
    df = df.sort_values(["route_id", "station_name", "direction_id", "observed_at"])
    df["headway_seconds"] = (
        df.groupby(["route_id", "station_name", "direction_id"], dropna=False)["observed_at"]
        .diff()
        .dt.total_seconds()
    )

    grouped = (
        df.groupby(["route_id", "station_name", "direction_id", "time_of_day"], dropna=False)
        .agg(
            observation_count=("vehicle_id", "count"),
            avg_delay_seconds=("delay_seconds", "mean"),
            avg_headway_seconds=("headway_seconds", "mean"),
            on_time_rate=("is_on_time", "mean"),
        )
        .reset_index()
    )
    return grouped.where(pd.notnull(grouped), None)


def load_records_frame(session: Session, route_id: str | None = None) -> pd.DataFrame:
    query = session.query(VehiclePositionRecord)
    if route_id:
        query = query.filter(VehiclePositionRecord.route_id == route_id)
    rows = query.all()
    return pd.DataFrame(
        [
            {
                "route_id": row.route_id,
                "station_name": row.station_name,
                "direction_id": row.direction_id,
                "observed_at": row.observed_at,
                "delay_seconds": row.delay_seconds,
                "vehicle_id": row.vehicle_id,
            }
            for row in rows
        ]
    )


def _bucket_from_hour(hour: int) -> str:
    if 6 <= hour < 10:
        return "morning_peak"
    if 10 <= hour < 15:
        return "midday"
    if 15 <= hour < 19:
        return "evening_peak"
    if 19 <= hour < 24:
        return "evening"
    return "overnight"
