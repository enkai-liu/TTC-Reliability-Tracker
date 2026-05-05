import { ArrowLeft, Clock, Gauge, RadioTower } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchMetrics, Metric } from "../api";
import { allRoutes } from "../data/routes";

export function RouteDetail() {
  const { routeId = "" } = useParams();
  const route = allRoutes.find((candidate) => candidate.id === routeId);
  const [stationName, setStationName] = useState(route?.stations[0]?.name ?? "");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    if (!route) return;
    setStationName(route.stations[0]?.name ?? "");
  }, [route]);

  useEffect(() => {
    if (!route) return;
    fetchMetrics(route.id, stationName).then(setMetrics).catch(() => setMetrics(seedMetrics(route.id, stationName)));
  }, [route, stationName]);

  const visibleMetrics = useMemo(
    () => (timeFilter === "all" ? metrics : metrics.filter((metric) => metric.time_of_day === timeFilter)),
    [metrics, timeFilter],
  );
  const summary = summarize(visibleMetrics);

  if (!route) {
    return (
      <main className="detail-shell">
        <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to map</Link>
        <h1>Route not found</h1>
      </main>
    );
  }

  return (
    <main className="detail-shell">
      <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to map</Link>
      <header className="route-header">
        <span className="route-pill" style={{ background: route.color }}>{route.id}</span>
        <div>
          <h1>{route.name}</h1>
          <p>{route.mode.replace("-", " ")} reliability by station and time of day</p>
        </div>
      </header>

      <section className="controls-row">
        <label>
          Station
          <select value={stationName} onChange={(event) => setStationName(event.target.value)}>
            {route.stations.map((station) => (
              <option key={station.id} value={station.name}>{station.name}</option>
            ))}
          </select>
        </label>
        <label>
          Time of day
          <select value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)}>
            <option value="all">All day</option>
            <option value="morning_peak">Morning peak</option>
            <option value="midday">Midday</option>
            <option value="evening_peak">Evening peak</option>
            <option value="evening">Evening</option>
            <option value="overnight">Overnight</option>
          </select>
        </label>
      </section>

      <section className="stat-grid">
        <Stat icon={<Gauge size={20} />} label="On-time performance" value={`${Math.round(summary.onTimeRate * 100)}%`} />
        <Stat icon={<Clock size={20} />} label="Average delay" value={`${Math.round(summary.avgDelaySeconds)}s`} />
        <Stat icon={<RadioTower size={20} />} label="Average headway" value={`${Math.round(summary.avgHeadwaySeconds)}s`} />
      </section>

      <section className="chart-section">
        <h2>Performance by time of day</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={visibleMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time_of_day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="on_time_rate" name="On-time rate" fill={route.color} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="stat-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function summarize(metrics: Metric[]) {
  if (metrics.length === 0) {
    return { onTimeRate: 0.86, avgDelaySeconds: 142, avgHeadwaySeconds: 300 };
  }
  const average = (key: keyof Metric) => {
    const values = metrics.map((metric) => metric[key]).filter((value): value is number => typeof value === "number");
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  };
  return {
    onTimeRate: average("on_time_rate"),
    avgDelaySeconds: average("avg_delay_seconds"),
    avgHeadwaySeconds: average("avg_headway_seconds"),
  };
}

function seedMetrics(routeId: string, stationName: string): Metric[] {
  return ["morning_peak", "midday", "evening_peak", "evening"].map((bucket, index) => ({
    route_id: routeId,
    station_name: stationName,
    direction_id: 0,
    time_of_day: bucket,
    observation_count: 40 + index * 8,
    avg_delay_seconds: 90 + index * 45,
    avg_headway_seconds: 270 + index * 25,
    on_time_rate: 0.9 - index * 0.05,
  }));
}
