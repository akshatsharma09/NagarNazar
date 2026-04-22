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
        💧 Water
      </p>

      <p>
        ⚡ Electricity
      </p>

      <p>
        🚰 Sewage
      </p>

    </div>

  );

}

export default Legend;