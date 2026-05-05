import type { KeyboardEvent } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LiveVehicle } from "../api";
import { RouteDefinition, routes } from "../data/routes";

type SystemMapProps = {
  vehicles: LiveVehicle[];
};

export function SystemMap({ vehicles }: SystemMapProps) {
  const navigate = useNavigate();
  const vehicleByRouteStation = useMemo(() => {
    const index = new Map<string, LiveVehicle[]>();
    for (const vehicle of vehicles) {
      if (!vehicle.station_name) continue;
      const key = `${vehicle.route_id}:${vehicle.station_name}`;
      index.set(key, [...(index.get(key) ?? []), vehicle]);
    }
    return index;
  }, [vehicles]);

  return (
    <div className="system-map" role="img" aria-label="Interactive TTC system map">
      <img
        className="system-map-image"
        src="/ttc-system-map.png"
        alt="TTC subway, light rail, and streetcar map"
      />
      <svg className="map-overlay" viewBox="0 0 1550 1550" aria-hidden="true">
        {routes.map((route) => (
          <RouteLayer
            key={route.id}
            route={route}
            onClick={() => navigate(`/routes/${route.id}`)}
            vehicleByRouteStation={vehicleByRouteStation}
          />
        ))}
      </svg>
    </div>
  );
}

type RouteLayerProps = {
  route: RouteDefinition;
  onClick: () => void;
  vehicleByRouteStation: Map<string, LiveVehicle[]>;
};

function RouteLayer({ route, onClick, vehicleByRouteStation }: RouteLayerProps) {
  const points = route.stations.map((station) => `${station.x},${station.y}`).join(" ");
  const showVehicles = route.mode === "subway" || route.mode === "light-rail";
  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <g
      className={`route-layer route-${route.mode}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`${route.name} detail page`}
    >
      <polyline
        className="route-focus"
        points={points}
        fill="none"
        stroke={route.color}
        strokeWidth={route.mode === "streetcar" ? 7 : 15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        className="route-hit"
        points={points}
        fill="none"
        strokeWidth={route.mode === "streetcar" ? 24 : 32}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {route.stations.map((station) => {
        const vehicleCount = vehicleByRouteStation.get(`${route.id}:${station.name}`)?.length ?? 0;
        return (
          <g key={station.id}>
            {showVehicles && vehicleCount > 0 ? (
              <>
                <circle cx={station.x} cy={station.y} r="11" className="station-lit" />
                <circle cx={station.x} cy={station.y} r="19" className="vehicle-pulse" />
              </>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
