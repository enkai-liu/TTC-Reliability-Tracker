import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./pages/App";
import { RouteDetail } from "./pages/RouteDetail";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/routes/:routeId" element={<RouteDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
