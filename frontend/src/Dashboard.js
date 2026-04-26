import React, { useEffect, useState, useRef } from "react";

import MapView from "./MapView";
import Sidebar from "./Sidebar";
import Legend from "./Legend";
import StatsPanel from "./StatsPanel";
import SearchBox from "./SearchBox";
import { fetchUtilities } from "./api";

import "./styles.css";

function Dashboard() {

  const mapRef = useRef(null);

  const [utilities, setUtilities] = useState([]);
  const [filteredUtilities, setFilteredUtilities] = useState([]);

  const [typeFilter, setTypeFilter] = useState(["Water", "Electricity", "Sewage"]);
  const [riskFilter, setRiskFilter] = useState(["High", "Medium", "Low"]);

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

    if (typeFilter.length > 0) {
      data = data.filter(u => typeFilter.includes(u.type));
    } else {
      data = [];
    }

    if (riskFilter.length > 0) {
      data = data.filter(u => riskFilter.includes(u.risk));
    } else {
      data = [];
    }

    setFilteredUtilities(data);

  }, [typeFilter, riskFilter, utilities]);

  return (
    <div className="mainLayout flex h-screen bg-blue-50 overflow-hidden font-display">

      <Sidebar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        mapRef={mapRef}
      />

      <div className="mapSection flex-1 relative m-4 ml-0 neo-brutalist border-4 border-black">

        <MapView utilities={filteredUtilities} mapRef={mapRef} />

        <div className="absolute top-6 right-6 flex flex-col items-end gap-4 z-10 h-[calc(100%-3rem)] overflow-y-auto pb-6 hidden md:flex" style={{ width: 'auto' }}>
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