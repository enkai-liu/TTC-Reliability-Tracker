export type Metric = {
  route_id: string;
  station_name: string;
  direction_id: number | null;
  time_of_day: string;
  observation_count: number;
  avg_delay_seconds: number | null;
  avg_headway_seconds: number | null;
  on_time_rate: number | null;
};

export type LiveVehicle = {
  route_id: string;
  vehicle_id: string;
  trip_id: string | null;
  station_name: string | null;
  stop_id: string | null;
  current_stop_sequence: number | null;
  observed_at: string;
  progress: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function fetchMetrics(routeId: string, stationName?: string): Promise<Metric[]> {
  const params = new URLSearchParams({ route_id: routeId });
  if (stationName) params.set("station_name", stationName);
  const response = await fetch(`${API_BASE_URL}/metrics?${params}`);
  if (!response.ok) throw new Error("Unable to load route metrics");
  return response.json();
}

export async function fetchLiveVehicles(): Promise<LiveVehicle[]> {
  const response = await fetch(`${API_BASE_URL}/live/vehicles`);
  if (!response.ok) throw new Error("Unable to load live vehicles");
  return response.json();
}
