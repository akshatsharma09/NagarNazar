import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

import Subscription from "./Subscription";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pricing" element={<Subscription />} />
    </Routes>
  );
}

export default App;