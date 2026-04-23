import React from "react";

function Legend() {

  return (

    <div className="legendBox bg-pink-400 neo-brutalist p-3 font-display w-40 shrink-0">

      <h3 className="text-lg font-black-900 border-b-2 border-black pb-1 mb-2 uppercase tracking-tighter">Legend</h3>

      <div className="space-y-2 font-bold text-sm">
        <p className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></span> 
          High Risk
        </p>

        <p className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></span> 
          Medium Risk
        </p>

        <p className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-black inline-block shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></span> 
          Low Risk
        </p>
      </div>

      <hr className="border-t-2 border-black my-2"/>

<<<<<<< HEAD
      <p>
        <span style={{color:"#0077ff"}}>━━</span>
        Water Pipeline
      </p>

      <p>
        <span style={{color:"#8000ff"}}>– –</span>
        Sewage Pipeline
      </p>

      <p>
        <span style={{color:"#FFD700"}}>━━</span>
        Electricity Line
      </p>

      <p>
        ⚡ Electric Pole
      </p>
=======
      <div className="space-y-1 text-sm font-bold">
        <p>💧 Water</p>
        <p>⚡ Electricity</p>
        <p>🚰 Sewage</p>
      </div>
>>>>>>> 6879bb4 (updated MapView with pipeline + removed token)

    </div>

  );

}

export default Legend;