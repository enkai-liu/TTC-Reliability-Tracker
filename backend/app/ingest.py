from __future__ import annotations

import argparse
from pathlib import Path

import requests
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db import SessionLocal, init_db
from app.gtfs_realtime import build_fixture_feed, parse_vehicle_positions
from app.repository import upsert_vehicle_positions
from app.static_gtfs import StaticGtfs


def load_static_gtfs() -> StaticGtfs:
    settings = get_settings()
    if settings.gtfs_static_zip_path:
        path = Path(settings.gtfs_static_zip_path)
        if path.exists():
            return StaticGtfs.from_zip(path)
    if settings.gtfs_static_zip_url:
        return StaticGtfs.from_url(settings.gtfs_static_zip_url, Path("/tmp/ttc-gtfs-static.zip"))
    return StaticGtfs.empty()


def fetch_realtime_payload() -> bytes:
    settings = get_settings()
    if not settings.gtfs_realtime_vehicle_positions_url:
        return build_fixture_feed()

    headers = {}
    if settings.gtfs_realtime_api_key:
        headers["Authorization"] = f"Bearer {settings.gtfs_realtime_api_key}"
    response = requests.get(settings.gtfs_realtime_vehicle_positions_url, headers=headers, timeout=20)
    response.raise_for_status()
    return response.content


def ingest_once(session: Session | None = None) -> int:
    init_db()
    static_gtfs = load_static_gtfs()
    payload = fetch_realtime_payload()
    records = parse_vehicle_positions(payload, static_gtfs)

    owns_session = session is None
    session = session or SessionLocal()
    try:
        return upsert_vehicle_positions(session, records)
    finally:
        if owns_session:
            session.close()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--once", action="store_true", help="Run one ingestion cycle")
    args = parser.parse_args()
    if args.once:
        inserted = ingest_once()
        print(f"Inserted {inserted} vehicle-position records")


if __name__ == "__main__":
    main()
