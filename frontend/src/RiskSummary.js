import React from "react";

function RiskSummary({ data }) {

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

    <div className="riskBox">

      <h3>Risk Status:</h3>

      <p style={{color:"red",fontWeight:"bold"}}>
        🔴 High Risk: {high}
      </p>

      <p style={{color:"orange",fontWeight:"bold"}}>
        🟡 Medium Risk: {medium}
      </p>

      <p style={{color:"green",fontWeight:"bold"}}>
        🟢 Low Risk: {low}
      </p>

    </div>

  );

}

export default RiskSummary;