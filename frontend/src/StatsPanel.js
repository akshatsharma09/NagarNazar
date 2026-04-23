import React from "react";

function StatsPanel({ data }) {

  const total = data.length;

  const high =
    data.filter(d =>
      d.risk === "High"
    ).length;

  const medium =
    data.filter(d =>
      d.risk === "Medium"
    ).length;

  const low =
    data.filter(d =>
      d.risk === "Low"
    ).length;

  return (

    <div className="statsBox bg-cyan-300 neo-brutalist p-3 font-display w-40 shrink-0">

      <h3 className="text-lg font-black-900 border-b-2 border-black pb-1 mb-2 uppercase tracking-tighter">
        Stats
      </h3>

      <div className="space-y-2 text-sm font-bold">
        <p className="flex justify-between items-center text-black bg-white neo-brutalist-sm px-2 py-1">
          <span>TOTAL</span>
          <span className="text-base">{total}</span>
        </p>

        <p className="flex justify-between items-center text-black bg-red-400 neo-brutalist-sm px-2 py-1">
          <span>HIGH</span>
          <span className="text-base">{high}</span>
        </p>

        <p className="flex justify-between items-center text-black bg-yellow-400 neo-brutalist-sm px-2 py-1">
          <span>MED</span>
          <span className="text-base">{medium}</span>
        </p>

        <p className="flex justify-between items-center text-black bg-green-400 neo-brutalist-sm px-3 py-1">
          <span>LOW</span>
          <span className="text-2xl">{low}</span>
        </p>
      </div>

    </div>

  );

}

export default StatsPanel;