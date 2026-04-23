import React, { useEffect, useState } from "react";

import MapView from "./MapView";
import Sidebar from "./Sidebar";
import Legend from "./Legend";
import StatsPanel from "./StatsPanel";
import SearchBox from "./SearchBox";
import { fetchUtilities } from "./api";

import "./styles.css";

function Dashboard() {

  const [utilities, setUtilities] = useState([]);
  const [filteredUtilities, setFilteredUtilities] = useState([]);

  const [typeFilter, setTypeFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  /* FETCH DATA */
  useEffect(() => {
    fetchUtilities()
      .then(data => {
        setUtilities(data);
        setFilteredUtilities(data);
      })
      .catch(err => console.error(err));
  }, []);

  /* FILTER */
  useEffect(() => {

    let data = utilities;

    if (typeFilter !== "All") {
      data = data.filter(u => u.type === typeFilter);
    }

    if (riskFilter !== "All") {
      data = data.filter(u => u.risk === riskFilter);
    }

    setFilteredUtilities(data);

  }, [typeFilter, riskFilter, utilities]);

  return (
    <div className="mainLayout">

      <Sidebar
        setTypeFilter={setTypeFilter}
        setRiskFilter={setRiskFilter}
      />

      <div className="mapSection">

        <MapView utilities={filteredUtilities} />

        <Legend />

        <StatsPanel data={filteredUtilities} />

        <SearchBox
          utilities={utilities}
          setFilteredUtilities={setFilteredUtilities}
        />

      </div>

    </div>
  );
}

export default Dashboard;