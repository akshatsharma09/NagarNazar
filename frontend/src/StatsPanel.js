import React from "react";

function StatsPanel({ data }) {

  const total = data.length;

  const high = data.filter(d => d.risk === "High").length;
  const medium = data.filter(d => d.risk === "Medium").length;
  const low = data.filter(d => d.risk === "Low").length;

  // ✅ Correct percentage calculation
  const highPct = total === 0 ? 0 : Math.round((high / total) * 100);
  const medPct = total === 0 ? 0 : Math.round((medium / total) * 100);
  const lowPct = total === 0 ? 0 : Math.round((low / total) * 100);

  // ✅ FIXED: Proper conic gradient (NO deg mixing)
  const conicString = `conic-gradient(
    #f87171 0% ${highPct}%,
    #000 ${highPct}% ${highPct + 1}%,
    #facc15 ${highPct + 1}% ${highPct + medPct}%,
    #000 ${highPct + medPct}% ${highPct + medPct + 1}%,
    #4ade80 ${highPct + medPct + 1}% 100%
  )`;

  return (

    <div className="statsBox bg-cyan-300 neo-brutalist p-3 pb-4 font-display w-max shrink-0 flex flex-col gap-3">

      <h3 className="text-lg leading-none font-black-900 border-b-2 border-black pb-2 uppercase tracking-tighter w-full">
        Stats
      </h3>

      <div className="flex flex-row gap-4 items-stretch h-full">

        {/* Left side */}
        <div className="flex flex-col min-w-[9.5rem] justify-between h-full space-y-2">
          <div className="space-y-2 text-sm font-bold flex flex-col justify-between flex-1">

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
              <span className="text-xl">{low}</span>
            </p>

          </div>
        </div>

        {/* Right side */}
        {total > 0 && (
          <div className="flex flex-col p-2 bg-yellow-200 border-2 border-black neo-brutalist-sm w-[110px]">

            <h4 className="text-[10px] font-black-900 uppercase tracking-tighter pb-1 border-b-2 border-black w-full text-center">
              Risk Div.
            </h4>

            <div className="flex-1 flex flex-col justify-center items-center py-2 h-[80px]">

              {/* ✅ PIE FIXED */}
              <div
                className="w-14 h-14 rounded-full border-2 border-black relative"
                style={{
                  background: conicString,
                  boxShadow: '3px 3px 0px 0px #000'
                }}
              >

                {/* ✅ Donut center (visual fix) */}
                <div className="absolute w-6 h-6 bg-yellow-200 border-2 border-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

              </div>

            </div>

            <div className="flex w-full justify-between items-center text-[9px] font-black-900 mt-1">

              <span className="text-red-700 bg-white border border-black px-0.5 neo-brutalist-sm">
                {highPct}%
              </span>

              <span className="text-yellow-700 bg-white border border-black px-0.5 neo-brutalist-sm">
                {medPct}%
              </span>

              <span className="text-green-700 bg-white border border-black px-0.5 neo-brutalist-sm">
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