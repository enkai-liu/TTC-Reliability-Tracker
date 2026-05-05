# TTC Reliability Tracker

Full-stack MVP for tracking TTC reliability from GTFS realtime vehicle positions.

## What Is Included

- Python backend with FastAPI, SQLAlchemy, Pandas, and GTFS realtime protobuf parsing.
- PostgreSQL persistence for daily vehicle-position observations.
- Analytics endpoints for delay, headway, on-time performance, and vehicle state.
- React/Vite frontend with a recreated vector TTC system map, rail/streetcar selection, bus search, and station-level dashboards.
- Azure Functions timer entrypoint for one-minute ingestion.
- GitHub Actions workflows for backend tests, frontend checks, and Azure deployment.
- Docker Compose for local PostgreSQL.

## Quick Start

```bash
cp .env.example .env
docker compose up -d postgres

cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.api:app --reload

cd ../frontend
npm install
npm run dev
```

The backend runs on `http://localhost:8000`; the frontend expects it at that URL by default.

## Configuration

All feed access is config-driven. Set these environment variables for live TTC data:

- `DATABASE_URL`
- `GTFS_REALTIME_VEHICLE_POSITIONS_URL`
- `GTFS_REALTIME_API_KEY`
- `GTFS_STATIC_ZIP_URL`
- `GTFS_STATIC_ZIP_PATH`

When no realtime feed is configured, local fixture generation is used for development and tests.

## Useful Commands

```bash
cd backend
pytest
python -m app.ingest --once

cd frontend
npm run test
npm run build
```

## Deployment Notes

The Azure Functions timer is defined in `azure_functions/function_app.py`. It calls the same ingestion code used locally. GitHub Actions expects these secrets:

- `AZURE_FUNCTIONAPP_NAME`
- `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
- `VITE_API_BASE_URL`

Grafana is intentionally not required for the MVP. The analytics API and database tables are shaped so Grafana or Azure Managed Grafana can be added later.
