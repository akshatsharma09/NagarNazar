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

    <div className="statsBox">

      <h3>
        System Stats
      </h3>

      <p>
        Total: {total}
      </p>

      <p style={{color:"red"}}>
        High: {high}
      </p>

      <p style={{color:"orange"}}>
        Medium: {medium}
      </p>

      <p style={{color:"green"}}>
        Low: {low}
      </p>

    </div>

  );

}

export default StatsPanel;