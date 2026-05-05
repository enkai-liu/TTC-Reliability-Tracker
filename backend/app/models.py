from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, Index, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class VehiclePositionRecord(Base):
    __tablename__ = "vehicle_position_records"

    id: Mapped[int] = mapped_column(primary_key=True)
    service_date: Mapped[date] = mapped_column(Date, index=True)
    feed_timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    observed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    route_id: Mapped[str | None] = mapped_column(String(32), index=True)
    trip_id: Mapped[str | None] = mapped_column(String(96), index=True)
    direction_id: Mapped[int | None] = mapped_column(Integer)
    vehicle_id: Mapped[str] = mapped_column(String(96), index=True)
    stop_id: Mapped[str | None] = mapped_column(String(64), index=True)
    station_name: Mapped[str | None] = mapped_column(String(128), index=True)
    current_stop_sequence: Mapped[int | None] = mapped_column(Integer)
    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)
    bearing: Mapped[float | None] = mapped_column(Float)
    speed: Mapped[float | None] = mapped_column(Float)
    delay_seconds: Mapped[int | None] = mapped_column(Integer)
    schedule_relationship: Mapped[str | None] = mapped_column(String(32))

    __table_args__ = (
        UniqueConstraint(
            "service_date",
            "feed_timestamp",
            "vehicle_id",
            "trip_id",
            "stop_id",
            name="uq_vehicle_observation",
        ),
        Index("ix_vehicle_route_station_time", "route_id", "station_name", "observed_at"),
    )


class MetricSnapshot(Base):
    __tablename__ = "metric_snapshots"

    id: Mapped[int] = mapped_column(primary_key=True)
    service_date: Mapped[date] = mapped_column(Date, index=True)
    route_id: Mapped[str] = mapped_column(String(32), index=True)
    station_name: Mapped[str] = mapped_column(String(128), index=True)
    direction_id: Mapped[int | None] = mapped_column(Integer)
    time_of_day: Mapped[str] = mapped_column(String(32), index=True)
    observation_count: Mapped[int] = mapped_column(Integer)
    avg_delay_seconds: Mapped[float | None] = mapped_column(Float)
    avg_headway_seconds: Mapped[float | None] = mapped_column(Float)
    on_time_rate: Mapped[float | None] = mapped_column(Float)
    computed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)

    __table_args__ = (
        UniqueConstraint(
            "service_date",
            "route_id",
            "station_name",
            "direction_id",
            "time_of_day",
            name="uq_metric_snapshot_bucket",
        ),
    )
