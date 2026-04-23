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
    <div className="mainLayout flex h-screen bg-blue-50 overflow-hidden font-display">

      <Sidebar
        setTypeFilter={setTypeFilter}
        setRiskFilter={setRiskFilter}
      />

      <div className="mapSection flex-1 relative m-4 ml-0 neo-brutalist border-4 border-black">

        <MapView utilities={filteredUtilities} />

        <div className="absolute top-6 right-16 flex flex-col gap-4 z-10 h-[calc(100%-3rem)] overflow-y-auto pb-6 pr-4 hidden md:flex" style={{ width: 'auto' }}>
          <Legend />
          <StatsPanel data={filteredUtilities} />
        </div>

        <SearchBox
          utilities={utilities}
          setFilteredUtilities={setFilteredUtilities}
        />

      </div>

    </div>
  );
}

export default Dashboard;