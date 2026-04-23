import React from "react";

function Legend() {

  return (

    <div className="legendBox">

      <h3>Legend</h3>

      <p>
        🔴 <b>High Risk</b>
      </p>

      <p>
        🟡 <b>Medium Risk</b>
      </p>

      <p>
        🟢 <b>Low Risk</b>
      </p>

      <hr/>

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

    </div>

  );

}

export default Legend;