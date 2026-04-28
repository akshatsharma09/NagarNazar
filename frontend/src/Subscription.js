import React from "react";

function Subscription() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f0f0f0]"
      style={{
        backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }}
    >
      {/* Header */}
      <header className="text-center mb-16 max-w-2xl">
        <div className="inline-block bg-yellow-200 border-4 border-black px-4 py-1 mb-4 rotate-[-2deg]">
          <span className="font-black text-xl tracking-tighter">
            NAGAR NAZAR
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">
          Simple & <span className="text-blue-600">Scalable</span> Pricing
        </h1>

        <p className="text-xl font-bold mb-2">
          Choose the right plan for your city infrastructure management
        </p>

        <p className="text-lg bg-white inline-block px-2 border-4 border-black">
          From visualization to intelligent decision-making
        </p>
      </header>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-6xl">

        {/* 🟢 BASIC PLAN */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 w-full max-w-sm flex flex-col hover:translate-[-4px_-4px] hover:shadow-[16px_16px_0px_#000] transition-all">

          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase mb-1">Basic Plan</h2>
            <p className="font-bold text-gray-600">
              Starter Municipal Plan
            </p>
          </div>

          <div className="text-2xl font-black mb-2">
            ₹25,000 – ₹40,000
          </div>
          <p className="text-sm font-bold mb-6">per month</p>

          <p className="font-bold mb-2">Best for:</p>
          <p className="mb-6 text-gray-700 font-semibold">
            Small towns, campuses, rural municipalities
          </p>

          <ul className="space-y-3 mb-6 flex-grow text-sm font-bold">
            <li>🗺️ Utility Mapping Dashboard</li>
            <li>🌆 2.5D Map Visualization</li>
            <li>⚠️ Risk Detection (Low / Medium / High)</li>
            <li>📍 Marker-based Monitoring</li>
            <li>🔗 Basic Network Visualization</li>
            <li>📂 CSV Data Upload</li>
          </ul>

          <div className="text-xs font-bold mt-2 mb-6">
            Limits:
            <br />• Up to 5,000 assets
            <br />• 3 utility types
            <br />• Standard layers
          </div>

          <button className="w-full py-4 bg-white border-4 border-black shadow-[4px_4px_0px_#000] font-black uppercase tracking-widest hover:bg-yellow-200 hover:translate-[2px_2px] hover:shadow-[2px_2px_0px_#000] transition-all">
            Get Started
          </button>
        </div>

        {/* 🔴 PRO PLAN */}
        <div className="relative bg-gradient-to-br from-blue-600 to-pink-600 text-white border-4 border-black shadow-[12px_12px_0px_#000] p-8 w-full max-w-sm flex flex-col md:scale-110 hover:translate-[-4px_-4px] hover:shadow-[16px_16px_0px_#000] transition-all overflow-hidden">

          {/* Badge */}
          <div className="absolute top-4 right-[-35px] rotate-45 bg-yellow-400 text-black font-black px-10 py-1 border-y-4 border-black">
            POPULAR
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase mb-1">Pro Plan</h2>
            <p className="font-bold text-blue-100">
              Advanced Municipal Intelligence
            </p>
          </div>

          <div className="text-2xl font-black mb-2 text-yellow-300">
            ₹75,000 – ₹1,20,000
          </div>
          <p className="text-sm font-bold mb-6">per month</p>

          <p className="font-bold mb-2">Best for:</p>
          <p className="mb-6 text-blue-100 font-semibold">
            Medium municipalities and urban local bodies
          </p>

          <ul className="space-y-3 mb-6 flex-grow text-sm font-bold">
            <li>✅ Everything in Basic</li>
            <li>🔥 Advanced Utility Layering</li>
            <li>🌡️ Risk Heatmap Visualization</li>
            <li>🤖 Predictive Risk Forecast</li>
            <li>📊 Maintenance Priority Ranking</li>
            <li>📅 Weekly Risk Reports</li>
          </ul>

          <div className="text-xs font-bold mt-2 mb-6 text-white">
            Limits:
            <br />• Up to 25,000 assets
            <br />• Multi-zone city support
            <br />• Extended network visualization
          </div>

          <button className="w-full py-4 bg-yellow-400 text-black border-4 border-black shadow-[4px_4px_0px_#000] font-black uppercase tracking-widest hover:bg-white hover:translate-[2px_2px] hover:shadow-[2px_2px_0px_#000] transition-all">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20">
        <p className="font-black text-sm uppercase tracking-widest bg-black text-white px-4 py-2 shadow-[8px_8px_0px_#000]">
          Designed for scalable smart city deployment
        </p>
      </footer>
    </div>
  );
}

export default Subscription;