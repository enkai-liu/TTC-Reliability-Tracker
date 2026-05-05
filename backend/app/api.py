from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db import get_session, init_db
from app.ingest import ingest_once
from app.metrics import compute_metrics, load_records_frame
from app.models import VehiclePositionRecord
from app.schemas import LiveVehicleOut, MetricOut

settings = get_settings()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(title="TTC Reliability Tracker API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ingest/run")
def run_ingest() -> dict[str, int]:
    return {"inserted": ingest_once()}


@app.get("/metrics", response_model=list[MetricOut])
def metrics(
    route_id: str | None = Query(default=None),
    station_name: str | None = Query(default=None),
    session: Session = Depends(get_session),
) -> list[dict]:
    frame = load_records_frame(session, route_id=route_id)
    output = compute_metrics(frame)
    if station_name and not output.empty:
        output = output.loc[output["station_name"] == station_name]
    return output.to_dict(orient="records")


@app.get("/live/vehicles", response_model=list[LiveVehicleOut])
def live_vehicles(
    route_ids: list[str] = Query(default=["1", "2", "4", "5", "6"]),
    session: Session = Depends(get_session),
) -> list[LiveVehicleOut]:
    vehicles: list[LiveVehicleOut] = []
    for route_id in route_ids:
        latest_rows = (
            session.query(VehiclePositionRecord)
            .filter(VehiclePositionRecord.route_id == route_id)
            .order_by(desc(VehiclePositionRecord.observed_at))
            .limit(80)
            .all()
        )
        seen: set[str] = set()
        for row in latest_rows:
            if row.vehicle_id in seen:
                continue
            seen.add(row.vehicle_id)
            progress = 0.5 if row.current_stop_sequence is not None else 0
            vehicles.append(
                LiveVehicleOut(
                    route_id=row.route_id or route_id,
                    vehicle_id=row.vehicle_id,
                    trip_id=row.trip_id,
                    station_name=row.station_name,
                    stop_id=row.stop_id,
                    current_stop_sequence=row.current_stop_sequence,
                    observed_at=row.observed_at,
                    progress=progress,
                )
            )
    return vehicles
