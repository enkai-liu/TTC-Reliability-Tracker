from app.gtfs_realtime import build_fixture_feed, parse_vehicle_positions


def test_parse_vehicle_positions_from_fixture_feed():
    records = parse_vehicle_positions(build_fixture_feed())

    assert len(records) == 3
    assert records[0].route_id == "1"
    assert records[0].vehicle_id == "veh-1"
    assert records[0].current_stop_sequence == 1
    assert records[0].latitude is not None
