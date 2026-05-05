import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { RouteDetail } from "./RouteDetail";

vi.mock("../api", () => ({
  fetchMetrics: vi.fn().mockResolvedValue([
    {
      route_id: "1",
      station_name: "Finch",
      direction_id: 0,
      time_of_day: "morning_peak",
      observation_count: 10,
      avg_delay_seconds: 120,
      avg_headway_seconds: 300,
      on_time_rate: 0.8,
    },
  ]),
}));

describe("RouteDetail", () => {
  it("shows station and time-of-day controls", async () => {
    render(
      <MemoryRouter initialEntries={["/routes/1"]}>
        <Routes>
          <Route path="/routes/:routeId" element={<RouteDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Yonge-University Line")).toBeInTheDocument();
    expect(screen.getByLabelText(/station/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time of day/i)).toBeInTheDocument();
  });

  it("allows selecting a different station", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/routes/1"]}>
        <Routes>
          <Route path="/routes/:routeId" element={<RouteDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.selectOptions(screen.getByLabelText(/station/i), "Union");

    expect(screen.getByDisplayValue("Union")).toBeInTheDocument();
  });
});
