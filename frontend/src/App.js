import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

import Subscription from "./Subscription";
import Reports from "./Reports";
import Maintenance from "./Maintenance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pricing" element={<Subscription />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  );
}

export default App;