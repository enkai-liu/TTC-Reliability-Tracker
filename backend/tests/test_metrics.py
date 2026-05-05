from datetime import UTC, datetime

import pandas as pd

from app.metrics import compute_metrics


def test_compute_metrics_groups_by_route_station_and_time_of_day():
    frame = pd.DataFrame(
        [
            {
                "route_id": "1",
                "station_name": "Finch",
                "direction_id": 0,
                "observed_at": datetime(2026, 5, 3, 8, 0, tzinfo=UTC),
                "delay_seconds": 120,
                "vehicle_id": "a",
            },
            {
                "route_id": "1",
                "station_name": "Finch",
                "direction_id": 0,
                "observed_at": datetime(2026, 5, 3, 8, 5, tzinfo=UTC),
                "delay_seconds": 360,
                "vehicle_id": "b",
            },
        ]
    )

    metrics = compute_metrics(frame)

    assert metrics.iloc[0]["time_of_day"] == "morning_peak"
    assert metrics.iloc[0]["observation_count"] == 2
    assert metrics.iloc[0]["avg_delay_seconds"] == 240
    assert metrics.iloc[0]["avg_headway_seconds"] == 300
    assert metrics.iloc[0]["on_time_rate"] == 0.5
