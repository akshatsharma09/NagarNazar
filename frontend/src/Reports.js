import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchReportSummary, fetchReportFiltered } from "./api";

function Reports() {
  const [summary, setSummary] = useState({ total: 0, high: 0, medium: 0, low: 0 });
  const [data, setData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  useEffect(() => {
    fetchReportSummary().then(setSummary).catch(console.error);
  }, []);

  useEffect(() => {
    fetchReportFiltered(typeFilter, riskFilter).then(setData).catch(console.error);
  }, [typeFilter, riskFilter]);

  const exportCSV = () => {
    if (data.length === 0) return;
    const headers = ["ID", "Type", "Risk", "Action", "Condition", "Probability"];
    const csvRows = [];
    csvRows.push(headers.join(","));
    data.forEach(row => {
      csvRows.push([
        row.id,
        row.type,
        row.risk,
        `"${row.action}"`,
        row.condition,
        row.probability
      ].join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nagarnazar_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const highPct = summary.total === 0 ? 0 : Math.round((summary.high / summary.total) * 100);
  const medPct = summary.total === 0 ? 0 : Math.round((summary.medium / summary.total) * 100);
  const lowPct = summary.total === 0 ? 0 : Math.round((summary.low / summary.total) * 100);

  const conicString = `conic-gradient(
    #ef4444 0% ${highPct}%,
    rgba(255,255,255,0.05) ${highPct}% ${highPct + 1}%,
    #facc15 ${highPct + 1}% ${highPct + medPct}%,
    rgba(255,255,255,0.05) ${highPct + medPct}% ${highPct + medPct + 1}%,
    #22c55e ${highPct + medPct + 1}% 100%
  )`;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-zinc-300 font-display flex flex-col relative">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <Header />
      
      <div className="max-w-7xl mx-auto w-full px-6 py-8 relative z-10 flex-grow flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Analytics & Insights</h1>
            <p className="text-zinc-400 font-medium">Real-time infrastructure performance and risk distribution.</p>
          </div>
          <button onClick={exportCSV} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[16px]"></span> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Summary Cards */}
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-6 flex flex-col justify-center items-center">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Total Assets</span>
              <span className="text-4xl font-black text-white">{summary.total}</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 shadow-[0_10px_30px_rgba(239,68,68,0.1)] rounded-lg p-6 flex flex-col justify-center items-center">
              <span className="text-xs text-red-500 uppercase tracking-widest font-bold mb-2">High Risk</span>
              <span className="text-4xl font-black text-red-500">{summary.high}</span>
            </div>
            <div className="bg-yellow-400/10 border border-yellow-400/20 shadow-[0_10px_30px_rgba(250,204,21,0.1)] rounded-lg p-6 flex flex-col justify-center items-center">
              <span className="text-xs text-yellow-500 uppercase tracking-widest font-bold mb-2">Medium Risk</span>
              <span className="text-4xl font-black text-yellow-500">{summary.medium}</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 shadow-[0_10px_30px_rgba(34,197,94,0.1)] rounded-lg p-6 flex flex-col justify-center items-center">
              <span className="text-xs text-green-500 uppercase tracking-widest font-bold mb-2">Low Risk</span>
              <span className="text-4xl font-black text-green-500">{summary.low}</span>
            </div>
          </div>

          {/* Chart */}
          <div className="md:col-span-2 bg-[#0F172A]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-6 flex flex-col items-center justify-center">
            <h4 className="text-xs font-bold uppercase tracking-widest pb-4 border-b border-white/10 w-full text-center text-zinc-400 mb-6">
              Risk Distribution
            </h4>
            <div
              className="w-32 h-32 rounded-full relative shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-6"
              style={{ background: conicString }}
            >
              <div className="absolute w-20 h-20 bg-[#0F172A] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center">
                 <span className="text-sm font-black text-white">{summary.total > 0 ? "100%" : "0%"}</span>
              </div>
            </div>
            <div className="flex w-full justify-between items-center text-xs font-bold px-4">
              <span className="text-red-500">{highPct}% High</span>
              <span className="text-yellow-500">{medPct}% Med</span>
              <span className="text-green-500">{lowPct}% Low</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <h3 className="text-lg font-black uppercase tracking-widest text-white">Utility Details</h3>
            <div className="flex gap-4">
              <select 
                className="bg-black/50 border border-white/20 text-sm font-bold text-zinc-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-400"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Water">Water</option>
                <option value="Sewage">Sewage</option>
                <option value="Electricity">Electricity</option>
              </select>
              <select 
                className="bg-black/50 border border-white/20 text-sm font-bold text-zinc-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-400"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="All">All Risks</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-zinc-500 uppercase tracking-widest border-b border-white/5">
                  <th className="pb-3 px-4 font-bold">ID</th>
                  <th className="pb-3 px-4 font-bold">Type</th>
                  <th className="pb-3 px-4 font-bold">Risk</th>
                  <th className="pb-3 px-4 font-bold">Condition</th>
                  <th className="pb-3 px-4 font-bold">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{row.id}</td>
                    <td className="py-4 px-4 text-zinc-300 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${row.type === 'Water' ? 'bg-blue-500' : row.type === 'Electricity' ? 'bg-yellow-400' : 'bg-purple-500'}`}></span>
                      {row.type}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${row.risk === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : row.risk === 'Medium' ? 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30' : 'bg-green-500/10 text-green-500 border-green-500/30'}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-zinc-400">{row.condition}</td>
                    <td className="py-4 px-4 text-zinc-300">{row.action}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-zinc-500">No records found for the selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
