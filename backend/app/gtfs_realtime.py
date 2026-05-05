from __future__ import annotations

from datetime import UTC, datetime

from google.transit import gtfs_realtime_pb2

from app.schemas import VehiclePositionIn
from app.static_gtfs import StaticGtfs


def parse_vehicle_positions(payload: bytes, static_gtfs: StaticGtfs | None = None) -> list[VehiclePositionIn]:
    static = static_gtfs or StaticGtfs.empty()
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.ParseFromString(payload)

    feed_timestamp = datetime.fromtimestamp(feed.header.timestamp, tz=UTC)
    records: list[VehiclePositionIn] = []

    for entity in feed.entity:
        if not entity.HasField("vehicle"):
            continue
        vehicle = entity.vehicle
        trip = vehicle.trip
        position = vehicle.position
        vehicle_id = vehicle.vehicle.id or entity.id
        if not vehicle_id:
            continue

        observed_at = (
            datetime.fromtimestamp(vehicle.timestamp, tz=UTC)
            if vehicle.timestamp
            else feed_timestamp
        )
        route_id = trip.route_id or None
        direction_id = trip.direction_id if trip.HasField("direction_id") else None
        if not route_id:
            route_id, direction_id_from_static = static.trip_route(trip.trip_id or None)
            direction_id = direction_id if direction_id is not None else direction_id_from_static

        stop_id = vehicle.stop_id or None
        scheduled_seconds = static.scheduled_arrival_seconds(trip.trip_id or None, stop_id)
        observed_seconds = observed_at.hour * 3600 + observed_at.minute * 60 + observed_at.second
        delay_seconds = observed_seconds - scheduled_seconds if scheduled_seconds is not None else None

        records.append(
            VehiclePositionIn(
                service_date=observed_at.date(),
                feed_timestamp=feed_timestamp,
                observed_at=observed_at,
                route_id=route_id,
                trip_id=trip.trip_id or None,
                direction_id=direction_id,
                vehicle_id=vehicle_id,
                stop_id=stop_id,
                station_name=static.stop_name(stop_id) or fallback_station_name(stop_id),
                current_stop_sequence=(
                    vehicle.current_stop_sequence
                    if vehicle.HasField("current_stop_sequence")
                    else None
                ),
                latitude=position.latitude if vehicle.HasField("position") else None,
                longitude=position.longitude if vehicle.HasField("position") else None,
                bearing=position.bearing if vehicle.HasField("position") and position.HasField("bearing") else None,
                speed=position.speed if vehicle.HasField("position") and position.HasField("speed") else None,
                delay_seconds=delay_seconds,
                schedule_relationship=gtfs_realtime_pb2.TripDescriptor.ScheduleRelationship.Name(
                    trip.schedule_relationship
                )
                if trip.HasField("schedule_relationship")
                else None,
            )
        )

    return records


def build_fixture_feed() -> bytes:
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.header.gtfs_realtime_version = "2.0"
    feed.header.timestamp = 1_779_999_600

    samples = [
        ("veh-1", "1", "line1-trip-n", "FINCH", 1, 43.7808, -79.4157),
        ("veh-2", "2", "line2-trip-e", "BLOOR-YONGE", 8, 43.6709, -79.3859),
        ("veh-5", "5", "line5-trip-e", "CEDARVALE", 4, 43.6996, -79.4359),
    ]
    for index, (vehicle_id, route_id, trip_id, stop_id, sequence, lat, lon) in enumerate(samples):
        entity = feed.entity.add()
        entity.id = f"entity-{index}"
        entity.vehicle.trip.trip_id = trip_id
        entity.vehicle.trip.route_id = route_id
        entity.vehicle.vehicle.id = vehicle_id
        entity.vehicle.timestamp = feed.header.timestamp + index * 15
        entity.vehicle.stop_id = stop_id
        entity.vehicle.current_stop_sequence = sequence
        entity.vehicle.position.latitude = lat
        entity.vehicle.position.longitude = lon
    return feed.SerializeToString()


def fallback_station_name(stop_id: str | None) -> str | None:
    if not stop_id:
        return None
    return stop_id.replace("_", "-").replace("-", " ").title().replace(" Yonge", "-Yonge")
