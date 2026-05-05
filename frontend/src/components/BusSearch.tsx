import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { busRoutes } from "../data/routes";

export function BusSearch() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const lower = query.toLowerCase();
    return busRoutes.filter((route) => `${route.id} ${route.name}`.toLowerCase().includes(lower));
  }, [query]);

  return (
    <section className="bus-search" aria-label="Bus route search">
      <div className="search-box">
        <Search size={18} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search bus routes"
          aria-label="Search bus routes"
        />
      </div>
      <div className="bus-list">
        {matches.map((route) => (
          <Link key={route.id} to={`/routes/${route.id}`} className="bus-result">
            <strong>{route.id}</strong>
            <span>{route.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
