import React from "react";

function StatsPanel({ data }) {

  const total = data.length;

  const high = data.filter(d => d.risk === "High").length;
  const medium = data.filter(d => d.risk === "Medium").length;
  const low = data.filter(d => d.risk === "Low").length;

  const highPct = total === 0 ? 0 : Math.round((high / total) * 100);
  const medPct = total === 0 ? 0 : Math.round((medium / total) * 100);
  const lowPct = total === 0 ? 0 : Math.round((low / total) * 100);

  const conicString = `conic-gradient(
    #ef4444 0% ${highPct}%,
    rgba(255,255,255,0.05) ${highPct}% ${highPct + 1}%,
    #facc15 ${highPct + 1}% ${highPct + medPct}%,
    rgba(255,255,255,0.05) ${highPct + medPct}% ${highPct + medPct + 1}%,
    #22c55e ${highPct + medPct + 1}% 100%
  )`;

  return (

    <div className="statsBox bg-[#0B0F19]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-4 font-display w-max shrink-0 flex flex-col gap-4 text-zinc-300">

      <h3 className="text-sm font-black border-b border-white/10 pb-2 uppercase tracking-widest w-full text-white">
        Stats & Analytics
      </h3>

      <div className="flex flex-row gap-6 items-stretch h-full">

        {/* Left side */}
        <div className="flex flex-col min-w-[12rem] justify-between h-full space-y-3">
          <div className="grid grid-cols-2 gap-3 flex-1">

            <div className="flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-md p-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">TOTAL</span>
              <span className="text-xl font-black text-white">{total}</span>
            </div>

            <div className="flex flex-col justify-center items-center bg-red-500/10 border border-red-500/20 rounded-md p-2">
              <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold mb-1">HIGH RISK</span>
              <span className="text-xl font-black text-red-500">{high}</span>
            </div>

            <div className="flex flex-col justify-center items-center bg-yellow-400/10 border border-yellow-400/20 rounded-md p-2">
              <span className="text-[10px] text-yellow-500 uppercase tracking-widest font-bold mb-1">MED RISK</span>
              <span className="text-xl font-black text-yellow-500">{medium}</span>
            </div>

            <div className="flex flex-col justify-center items-center bg-green-500/10 border border-green-500/20 rounded-md p-2">
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold mb-1">LOW RISK</span>
              <span className="text-xl font-black text-green-500">{low}</span>
            </div>

          </div>
        </div>

        {/* Right side */}
        {total > 0 && (
          <div className="flex flex-col p-3 bg-white/5 border border-white/10 rounded-md w-[140px]">

            <h4 className="text-[10px] font-bold uppercase tracking-widest pb-2 border-b border-white/10 w-full text-center text-zinc-400">
              Risk Distribution
            </h4>

            <div className="flex-1 flex flex-col justify-center items-center py-4 h-[90px]">

              <div
                className="w-16 h-16 rounded-full relative shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{
                  background: conicString
                }}
              >
                <div className="absolute w-10 h-10 bg-[#0B0F19] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"></div>
              </div>

            </div>

            <div className="flex w-full justify-between items-center text-[10px] font-bold mt-2">
              <span className="text-red-500">
                {highPct}%
              </span>
              <span className="text-yellow-500">
                {medPct}%
              </span>
              <span className="text-green-500">
                {lowPct}%
              </span>
            </div>

          </div>
        )}

      </div>

    </div>

  );
}

export default StatsPanel;