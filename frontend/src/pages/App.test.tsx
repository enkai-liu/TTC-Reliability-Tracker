import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

vi.mock("../api", () => ({
  fetchLiveVehicles: vi.fn().mockResolvedValue([]),
}));

describe("App", () => {
  it("renders the system map and bus search", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/interactive ttc system map/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search bus routes/i)).toBeInTheDocument();
  });

  it("filters bus routes by search query", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/search bus routes/i), "airport");

    expect(screen.getByText("900")).toBeInTheDocument();
    expect(screen.getByText("Airport Express")).toBeInTheDocument();
  });
});
