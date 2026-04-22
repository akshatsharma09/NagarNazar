import React from "react";

function Sidebar({
  setTypeFilter,
  setRiskFilter
}) {

  return (

    <div className="sidebar">

      <h3>
        Filter Utilities
      </h3>

      <select
        onChange={e =>
          setTypeFilter(e.target.value)
        }
      >

        <option value="All">
          All Types
        </option>

        <option value="Water">
          Water
        </option>

        <option value="Electricity">
          Electricity
        </option>

        <option value="Sewage">
          Sewage
        </option>

      </select>

      <h3>
        Risk Status
      </h3>

      <select
        onChange={e =>
          setRiskFilter(e.target.value)
        }
      >

        <option value="All">
          All Risks
        </option>

        <option value="High">
          High Risk
        </option>

        <option value="Medium">
          Medium Risk
        </option>

        <option value="Low">
          Low Risk
        </option>

      </select>

    </div>

  );

}

export default Sidebar;