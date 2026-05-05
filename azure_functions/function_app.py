import logging

import azure.functions as func

from app.ingest import ingest_once

app = func.FunctionApp()


@app.timer_trigger(schedule="0 */1 * * * *", arg_name="timer", run_on_startup=False)
def ingest_vehicle_positions(timer: func.TimerRequest) -> None:
    if timer.past_due:
        logging.warning("TTC GTFS realtime ingestion timer is past due")

    inserted = ingest_once()
    logging.info("Inserted %s TTC vehicle-position records", inserted)
