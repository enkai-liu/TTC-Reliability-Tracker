import { useEffect, useState } from "react";
import { fetchLiveVehicles, LiveVehicle } from "../api";
import { BusSearch } from "../components/BusSearch";
import { SystemMap } from "../components/SystemMap";

export function App() {
  const [vehicles, setVehicles] = useState<LiveVehicle[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const nextVehicles = await fetchLiveVehicles();
        if (active) setVehicles(nextVehicles);
      } catch {
        if (active) setVehicles([]);
      }
    }
    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="home-shell">
      <section className="map-panel">
        <SystemMap vehicles={vehicles} />
      </section>
      <aside className="side-panel">
        <h1>TTC reliability</h1>
        <p>Pick a rail or streetcar line on the map, or search for a bus route.</p>
        <BusSearch />
      </aside>
    </main>
  );
}
