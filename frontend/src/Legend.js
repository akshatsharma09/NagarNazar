import React from "react";

function Legend() {

  return (

    <div className="legendBox bg-[#0B0F19]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-4 font-display min-w-[220px] w-max shrink-0 text-zinc-300">

      <h3 className="text-sm font-black border-b border-white/10 pb-2 mb-4 uppercase tracking-widest text-white">Legend</h3>

      <div className="space-y-3 font-medium text-sm">
        <p className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> 
          <span className="text-white">High Risk</span>
        </p>

        <p className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span> 
          <span className="text-white">Medium Risk</span>
        </p>

        <p className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span> 
          <span className="text-white">Low Risk</span>
        </p>
      </div>

      <hr className="border-t border-white/10 my-4"/>

      <div className="space-y-3 text-sm font-medium">
        <p className="flex items-center gap-2">
          <span className="text-blue-500 font-black">━━</span> <span className="text-zinc-400">Water Pipeline</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-purple-500 font-black tracking-widest">– –</span> <span className="text-zinc-400">Sewage Pipeline</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-yellow-500 font-black">━━</span> <span className="text-zinc-400">Electricity Line</span>
        </p>
      </div>

    </div>

  );

}

export default Legend;