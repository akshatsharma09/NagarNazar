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
    <div className="sidebar bg-[#0B0F19] border-r border-white/10 flex flex-col p-6 w-72 h-[calc(100vh)] font-display overflow-y-auto shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20 text-zinc-300">

      <h2 className="text-sm font-black border-b border-white/10 pb-3 mb-6 flex items-center gap-2 uppercase tracking-widest text-white mt-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filters
      </h2>

      <div className="mb-6">
        <label className="block text-xs font-bold text-zinc-500 pb-2 mb-3 uppercase tracking-widest">Utility Type</label>
        <div className="space-y-3 font-medium text-sm p-0">

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-5 flex justify-center text-blue-500">💧</span>
              <span className="group-hover:text-white transition-colors">Water</span>
            </div>
            <input
              type="checkbox"
              checked={typeFilter.includes("Water")}
              onChange={() => toggleType("Water")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-5 flex justify-center text-yellow-500">⚡</span>
              <span className="group-hover:text-white transition-colors">Electricity</span>
            </div>
            <input
              type="checkbox"
              checked={typeFilter.includes("Electricity")}
              onChange={() => toggleType("Electricity")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-5 flex justify-center text-purple-500">💩</span>
              <span className="group-hover:text-white transition-colors">Sewage</span>
            </div>
            <input
              type="checkbox"
              checked={typeFilter.includes("Sewage")}
              onChange={() => toggleType("Sewage")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-zinc-500 pb-2 mb-3 uppercase tracking-widest mt-4">Risk Level</label>
        <div className="space-y-3 font-medium text-sm p-0">

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] ml-1"></span>
              <span className="group-hover:text-white transition-colors">High Risk</span>
            </div>
            <input
              type="checkbox"
              checked={riskFilter.includes("High")}
              onChange={() => toggleRisk("High")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] ml-1"></span>
              <span className="group-hover:text-white transition-colors">Medium Risk</span>
            </div>
            <input
              type="checkbox"
              checked={riskFilter.includes("Medium")}
              onChange={() => toggleRisk("Medium")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] ml-1"></span>
              <span className="group-hover:text-white transition-colors">Low Risk</span>
            </div>
            <input
              type="checkbox"
              checked={riskFilter.includes("Low")}
              onChange={() => toggleRisk("Low")}
              className="w-4 h-4 rounded border border-white/20 bg-black/50 appearance-none checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✔'] checked:before:text-white checked:before:text-[10px] flex items-center justify-center cursor-pointer transition-all"
            />
          </label>

        </div>
      </div>

      {/* MAP CONTROLS */}
      <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
        <button
          onClick={tiltMap}
          className="bg-white/5 border border-white/10 text-white rounded-lg font-bold text-xs hover:bg-white/10 transition-colors uppercase tracking-widest py-3 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">2.5D View</span>
        </button>

        <button
          onClick={resetMap}
          className="bg-white/5 border border-white/10 text-white rounded-lg font-bold text-xs hover:bg-white/10 transition-colors uppercase tracking-widest py-3 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">Reset View</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;