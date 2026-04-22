import React, { useEffect, useState } from "react";
import axios from "axios";

import MapView from "./MapView";
import Sidebar from "./Sidebar";
import Legend from "./Legend";
import StatsPanel from "./StatsPanel";
import SearchBox from "./SearchBox";

import "./styles.css";

function Dashboard() {

  const [utilities, setUtilities] = useState([]);
  const [filteredUtilities, setFilteredUtilities] = useState([]);

  const [typeFilter, setTypeFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  /* FETCH DATA */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/utilities")
      .then(res => {
        setUtilities(res.data);
        setFilteredUtilities(res.data);
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