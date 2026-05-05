from datetime import date, datetime

from pydantic import BaseModel


class VehiclePositionIn(BaseModel):
    service_date: date
    feed_timestamp: datetime
    observed_at: datetime
    route_id: str | None = None
    trip_id: str | None = None
    direction_id: int | None = None
    vehicle_id: str
    stop_id: str | None = None
    station_name: str | None = None
    current_stop_sequence: int | None = None
    latitude: float | None = None
    longitude: float | None = None
    bearing: float | None = None
    speed: float | None = None
    delay_seconds: int | None = None
    schedule_relationship: str | None = None


class MetricOut(BaseModel):
    route_id: str
    station_name: str
    direction_id: int | None
    time_of_day: str
    observation_count: int
    avg_delay_seconds: float | None
    avg_headway_seconds: float | None
    on_time_rate: float | None


class LiveVehicleOut(BaseModel):
    route_id: str
    vehicle_id: str
    trip_id: str | None
    station_name: str | None
    stop_id: str | None
    current_stop_sequence: int | None
    observed_at: datetime
    progress: float
