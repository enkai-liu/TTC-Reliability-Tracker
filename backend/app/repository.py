from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.orm import Session

from app.models import VehiclePositionRecord
from app.schemas import VehiclePositionIn


def upsert_vehicle_positions(session: Session, records: list[VehiclePositionIn]) -> int:
    if not records:
        return 0

    payload = [record.model_dump() for record in records]
    if session.bind and session.bind.dialect.name == "postgresql":
        statement = pg_insert(VehiclePositionRecord).values(payload)
        statement = statement.on_conflict_do_nothing(
            constraint="uq_vehicle_observation",
        )
        result = session.execute(statement)
        session.commit()
        return int(result.rowcount or 0)

    inserted = 0
    for record in records:
        exists = (
            session.query(VehiclePositionRecord)
            .filter_by(
                service_date=record.service_date,
                feed_timestamp=record.feed_timestamp,
                vehicle_id=record.vehicle_id,
                trip_id=record.trip_id,
                stop_id=record.stop_id,
            )
            .first()
        )
        if exists:
            continue
        session.add(VehiclePositionRecord(**record.model_dump()))
        inserted += 1
    session.commit()
    return inserted
