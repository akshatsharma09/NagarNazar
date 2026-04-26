import React from "react";

function Sidebar({
  typeFilter = [],
  setTypeFilter,
  riskFilter = [],
  setRiskFilter,
  mapRef
}) {

  const tiltMap = () => {
    if (!mapRef?.current) return;
    mapRef.current.easeTo({
      pitch: 60,
      bearing: -20,
      zoom: 16,
      duration: 1200
    });
  };

  const resetMap = () => {
    if (!mapRef?.current) return;
    mapRef.current.easeTo({
      pitch: 0,
      bearing: 0,
      zoom: 12,
      duration: 1200
    });
  };

  const toggleType = (val) => {
    if (typeFilter.includes(val)) {
      setTypeFilter(typeFilter.filter(item => item !== val));
    } else {
      setTypeFilter([...typeFilter, val]);
    }
  };

  const toggleRisk = (val) => {
    if (riskFilter.includes(val)) {
      setRiskFilter(riskFilter.filter(item => item !== val));
    } else {
      setRiskFilter([...riskFilter, val]);
    }
  };

  return (

    <div className="sidebar bg-yellow-300 neo-brutalist flex flex-col p-4 m-4 w-64 h-[calc(100vh-2rem)] font-display overflow-y-auto">

      <h2 className="text-xl font-black-900 border-b-2 border-black pb-2 mb-6 flex items-center gap-2 uppercase tracking-tight">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filters
      </h2>

      <div className="mb-6">
        <label className="block text-base font-black-900 border-b-2 border-black pb-1 mb-3 uppercase">Utility Type</label>
        <div className="space-y-3 font-bold text-sm bg-white neo-brutalist-sm p-3">
          
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none w-6 text-center">💧</span>
              <span className="group-hover:underline">Water</span>
            </div>
            <input 
              type="checkbox" 
              checked={typeFilter.includes("Water")}
              onChange={() => toggleType("Water")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none w-6 text-center">⚡</span>
              <span className="group-hover:underline">Electricity</span>
            </div>
            <input 
              type="checkbox" 
              checked={typeFilter.includes("Electricity")}
              onChange={() => toggleType("Electricity")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none w-6 text-center">💩</span>
              <span className="group-hover:underline">Sewage</span>
            </div>
            <input 
              type="checkbox" 
              checked={typeFilter.includes("Sewage")}
              onChange={() => toggleType("Sewage")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-black-900 border-b-2 border-black pb-1 mb-3 uppercase">Risk Level</label>
        <div className="space-y-3 font-bold text-sm bg-white neo-brutalist-sm p-3">
          
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ml-1"></span>
              <span className="group-hover:underline">High Risk</span>
            </div>
            <input 
              type="checkbox" 
              checked={riskFilter.includes("High")}
              onChange={() => toggleRisk("High")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ml-1"></span>
              <span className="group-hover:underline">Medium Risk</span>
            </div>
            <input 
              type="checkbox" 
              checked={riskFilter.includes("Medium")}
              onChange={() => toggleRisk("Medium")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ml-1"></span>
              <span className="group-hover:underline">Low Risk</span>
            </div>
            <input 
              type="checkbox" 
              checked={riskFilter.includes("Low")}
              onChange={() => toggleRisk("Low")}
              className="w-5 h-5 border-2 border-black bg-white appearance-none checked:bg-blue-500 checked:before:content-['✔'] checked:before:text-white flex items-center justify-center cursor-pointer neo-brutalist-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </label>

        </div>
      </div>

      {/* MAP CONTROLS */}
      <div className="mt-auto flex flex-col gap-3 pt-4 border-t-2 border-black">
        <button
          onClick={tiltMap}
          className="neo-brutalist bg-blue-400 font-display font-black-900 text-sm hover:bg-blue-300 transition-colors uppercase py-2"
        >
          2.5D View
        </button>

        <button
          onClick={resetMap}
          className="neo-brutalist bg-green-400 font-display font-black-900 text-sm hover:bg-green-300 transition-colors uppercase py-2"
        >
          Reset View
        </button>
      </div>

    </div>

  );

}

export default Sidebar;