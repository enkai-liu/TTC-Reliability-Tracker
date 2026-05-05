from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import Base
from app.gtfs_realtime import build_fixture_feed, parse_vehicle_positions
from app.repository import upsert_vehicle_positions


def test_upsert_vehicle_positions_is_idempotent_for_daily_observations():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    records = parse_vehicle_positions(build_fixture_feed())

    first_insert = upsert_vehicle_positions(session, records)
    second_insert = upsert_vehicle_positions(session, records)

    assert first_insert == 3
    assert second_insert == 0
