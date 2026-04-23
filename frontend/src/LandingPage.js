import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingContainer">

      {/* Title */}
      <h1 className="title">NagarNazar</h1>

      {/* Tagline */}
      <p className="tagline">
        Apne Sheher ko Dekho, 
        samjho aur Surakshit Rakho
      </p>

      {/* Problem */}
      <p className="textBlock">
        City utility data is scattered and hard to understand, with no system to predict failures.
      </p>

      {/* Solution */}
      <p className="textBlock highlight">
        NagarNazar visualizes utilities in 2.5D and predicts risk for smarter decision-making.
      </p>

      {/* Button */}
      <button
        className="mainButton"
        onClick={() => navigate("/dashboard")}
      >
        Explore Map
      </button>

    </div>
  );
}

export default LandingPage;