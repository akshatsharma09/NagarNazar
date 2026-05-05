import React from "react";

function Subscription() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0B0F19] text-zinc-400 relative overflow-hidden transition-opacity duration-700">
      {/* Background patterns matching LandingPage */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#05080f]"></div>

      {/* Header */}
      <header className="text-center mb-16 max-w-2xl relative z-10 mt-10">
        <div className="inline-block bg-white/5 border border-white/10 px-4 py-1 mb-6 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <span className="font-bold text-sm tracking-widest uppercase text-zinc-300">
            NAGAR NAZAR
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight text-white drop-shadow-md">
          Simple & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">Scalable</span> Pricing
        </h1>

        <p className="text-xl font-bold mb-2 text-zinc-300">
          Choose the right plan for your city infrastructure management
        </p>

        <p className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mt-4">
          From visualization to intelligent decision-making
        </p>
      </header>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl relative z-10">

        {/* 🟢 BASIC PLAN */}
        <div className="bg-[#0F172A] border border-white/10 rounded-[20px] p-8 w-full max-w-sm flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 relative group">
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(255,255,255,0.02)] rounded-[20px]"></div>

          <div className="mb-6 relative z-10">
            <h2 className="text-3xl font-black uppercase mb-1 text-white">Basic Plan</h2>
            <p className="font-bold text-zinc-400">
              Starter Municipal Plan
            </p>
          </div>

          <div className="text-2xl font-black mb-2 text-white relative z-10">
            ₹25,000 – ₹40,000
          </div>
          <p className="text-sm font-bold mb-6 text-zinc-500 uppercase tracking-widest relative z-10">per month</p>

          <p className="font-bold mb-2 text-zinc-300 relative z-10">Best for:</p>
          <p className="mb-6 text-zinc-400 font-semibold relative z-10">
            Small towns, campuses, rural municipalities
          </p>

          <ul className="space-y-4 mb-6 flex-grow text-sm font-bold text-zinc-300 relative z-10">
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>Utility Mapping Dashboard</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>2.5D Map Visualization</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>Risk Detection (Low / Medium / High)</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>Marker-based Monitoring</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-zinc-600"></span>Basic Network Visualization</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-zinc-600"></span>CSV Data Upload</li>
          </ul>

          <div className="text-xs font-bold mt-2 mb-8 text-zinc-500 bg-white/5 p-4 rounded-xl border border-white/5 relative z-10">
            <span className="text-zinc-300 uppercase tracking-wider mb-2 block">Limits:</span>
            • Up to 5,000 assets<br />
            • 3 utility types<br />
            • Standard layers
          </div>

          <button className="w-full py-4 bg-transparent border border-white/20 text-white rounded-xl font-black uppercase tracking-widest hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 relative z-10 flex items-center justify-center gap-2">
            Get Started
            <span className="material-symbols-outlined text-sm"></span>
          </button>
        </div>

        {/* 🔴 PRO PLAN */}
        <div className="bg-[#111827] border border-yellow-500/30 rounded-[20px] p-8 w-full max-w-sm flex flex-col shadow-[0_0_30px_rgba(250,204,21,0.15)] md:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(250,204,21,0.25)] transition-all duration-300 relative group overflow-hidden z-10">
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(250,204,21,0.05)] rounded-[20px]"></div>

          {/* Badge */}
          <div className="absolute top-6 right-[-35px] rotate-45 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-10 py-1 text-xs tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.5)] z-20">
            POPULAR
          </div>

          <div className="mb-6 relative z-10">
            <h2 className="text-3xl font-black uppercase mb-1 text-white flex items-center gap-3">
              Pro Plan
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
            </h2>
            <p className="font-bold text-yellow-500/80">
              Advanced Municipal Intelligence
            </p>
          </div>

          <div className="text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 relative z-10">
            ₹75,000 – ₹1,20,000
          </div>
          <p className="text-sm font-bold mb-6 text-zinc-500 uppercase tracking-widest relative z-10">per month</p>

          <p className="font-bold mb-2 text-zinc-300 relative z-10">Best for:</p>
          <p className="mb-6 text-zinc-400 font-semibold relative z-10">
            Medium municipalities and urban local bodies
          </p>

          <ul className="space-y-4 mb-6 flex-grow text-sm font-bold text-white relative z-10">
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>Everything in Basic</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>Advanced Utility Layering</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>Risk Heatmap Visualization</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>Predictive Risk Forecast</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>Maintenance Priority Ranking</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>Weekly Risk Reports</li>
          </ul>

          <div className="text-xs font-bold mt-2 mb-8 text-zinc-400 bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 relative z-10">
            <span className="text-yellow-500 uppercase tracking-wider mb-2 block">Limits:</span>
            • Up to 25,000 assets<br />
            • Multi-zone city support<br />
            • Extended network visualization
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,200,0,0.3)] hover:scale-[1.02] transition-all duration-300 relative z-10 flex items-center justify-center gap-2">
            Upgrade to Pro
            <span className="material-symbols-outlined text-sm"></span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 mb-10 relative z-10">
        <p className="font-bold text-xs uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
          Designed for scalable smart city deployment
        </p>
      </footer>
    </div>
  );
}

export default Subscription;