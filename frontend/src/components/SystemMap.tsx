import type { KeyboardEvent } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LiveVehicle } from "../api";
import { RouteDefinition, railMapRoutes } from "../data/routes";

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
        src="/ttc-system-map.svg"
        alt="TTC subway and light rail map"
      />
      <svg className="map-overlay" viewBox="0 0 1650 1650" aria-hidden="true">
        {railMapRoutes.map((route) => (
          <RouteLayer
            key={route.id}
            route={route}
            onClick={() => navigate(`/routes/${route.id}`)}
          />
        ))}
      </svg>
      <img className="station-map-layer" src="/stations-only.svg" alt="" aria-hidden="true" />
      <svg className="live-map-overlay" viewBox="0 0 1650 1650" aria-hidden="true">
        {railMapRoutes.map((route) => (
          <LiveVehicleLayer
            key={route.id}
            route={route}
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
};

function RouteLayer({ route, onClick }: RouteLayerProps) {
  const points = route.stations.map((station) => `${station.x},${station.y}`).join(" ");
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
      {route.pathD ? (
        <>
          <path
            className="route-focus"
            d={route.pathD}
            fill="none"
            stroke={route.color}
            strokeWidth={17}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="route-hit"
            d={route.pathD}
            fill="none"
            strokeWidth={32}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <polyline
            className="route-focus"
            points={points}
            fill="none"
            stroke={route.color}
            strokeWidth={route.mode === "streetcar" ? 9 : 17}
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
        </>
      )}
    </g>
  );
}

type LiveVehicleLayerProps = {
  route: RouteDefinition;
  vehicleByRouteStation: Map<string, LiveVehicle[]>;
};

function LiveVehicleLayer({ route, vehicleByRouteStation }: LiveVehicleLayerProps) {
  const showVehicles = route.mode === "subway" || route.mode === "light-rail";
  if (!showVehicles) return null;

  return (
    <g>
      {route.stations.map((station) => {
        const vehicleCount = vehicleByRouteStation.get(`${route.id}:${station.name}`)?.length ?? 0;
        return vehicleCount > 0 ? (
          <g key={station.id}>
            <circle cx={station.x} cy={station.y} r="11" className="station-lit" />
            <circle cx={station.x} cy={station.y} r="19" className="vehicle-pulse" />
          </g>
        ) : null;
      })}
    </g>
  );
}
