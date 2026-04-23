import React from "react";

function Sidebar({
  setTypeFilter,
  setRiskFilter
}) {

  return (

    <div className="sidebar bg-yellow-300 neo-brutalist flex flex-col p-4 m-4 w-56 h-[calc(100vh-2rem)] font-display overflow-y-auto">

      <h2 className="text-xl font-black-900 border-b-2 border-black pb-2 mb-4 uppercase tracking-tight">
        Utilities
      </h2>

      <div className="mb-4">
        <label className="block text-base font-bold mb-1">Type</label>
        <select
          className="w-full neo-brutalist-sm p-2 text-sm bg-white cursor-pointer focus:outline-none focus:bg-blue-200 transition-colors"
          onChange={e =>
            setTypeFilter(e.target.value)
          }
        >

          <option value="All">All Types</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Sewage">Sewage</option>

        </select>
      </div>

      <div className="mb-4">
        <label className="block text-base font-bold mb-1">Risk Status</label>
        <select
          className="w-full neo-brutalist-sm p-2 text-sm bg-white cursor-pointer focus:outline-none focus:bg-pink-200 transition-colors"
          onChange={e =>
            setRiskFilter(e.target.value)
          }
        >

          <option value="All">All Risks</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>

        </select>
      </div>

    </div>

  );

}

export default Sidebar;