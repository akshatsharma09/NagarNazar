/* eslint-disable */
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function MapView({ utilities, mapRef }) {

  const mapContainer = useRef(null);
  const internalMap = useRef(null);
  const map = mapRef || internalMap;
  const markersRef = useRef([]);

  /* CREATE MAP */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [81.8463, 25.4358],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "bottom-right"
    );

    map.current.on("load", async () => {
      add3DBuildings();
      await loadNetwork();
    });

  }, []);




  /* 3D BUILDINGS */

  function add3DBuildings() {

    const layers = map.current.getStyle().layers;

    let labelLayerId;

    for (let i = 0; i < layers.length; i++) {
      if (
        layers[i].type === "symbol" &&
        layers[i].layout["text-field"]
      ) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    map.current.addLayer({
      id: "3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "min_height"],
        "fill-extrusion-opacity": 0.6
      }
    }, labelLayerId);

  }




  /* LOAD NETWORK */

  async function loadNetwork() {

    try {

      const res =
        await axios.get(
          `${process.env.REACT_APP_API_URL}/network`
        );

      const data = res.data;

      map.current.addSource("water-network", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data.water.map(line => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: line
            }
          }))
        }
      });

      map.current.addLayer({
        id: "water-layer",
        type: "line",
        source: "water-network",
        paint: {
          "line-color": "#0077ff",
          "line-width": 4,
          "line-opacity": 0.8
        }
      });

      map.current.addSource("sewage-network", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data.sewage.map(line => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: line
            }
          }))
        }
      });

      map.current.addLayer({
        id: "sewage-layer",
        type: "line",
        source: "sewage-network",
        paint: {
          "line-color": "#8000ff",
          "line-width": 3,
          "line-dasharray": [2, 2]
        }
      });

      map.current.addSource("electric-network", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data.electric.map(line => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: line
            }
          }))
        }
      });

      map.current.addLayer({
        id: "electric-layer",
        type: "line",
        source: "electric-network",
        paint: {
          "line-color": "#eab308",
          "line-width": 3,
          "line-opacity": 0.8
        }
      });

    } catch (err) {
      console.error("Network load failed:", err);
    }

  }




  /* UTILITY MARKERS */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (!map.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    utilities.forEach(u => {

      if (!u.lat || !u.lng) return;

      let color = "#22c55e"; // green-500
      if (u.risk === "Medium") color = "#facc15"; // yellow-400
      if (u.risk === "High") color = "#ef4444"; // red-500

      const riskColor = color;

      const typeLabelMap = {
        "Water": "WATER PIPE",
        "Electricity": "ELECTRIC CABLE",
        "Sewage": "SEWAGE LINE"
      };
      const typeLabel = typeLabelMap[u.type] || u.type.toUpperCase();

      const probLabelMap = {
        "High": "HIGH PROBABILITY",
        "Medium": "MEDIUM PROBABILITY",
        "Low": "LOW PROBABILITY"
      };
      const probLabel = probLabelMap[u.risk] || u.risk.toUpperCase();

      // Format date: "2026-03-10" → "10 Mar 2026"
      const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Unknown") return "\u2014";
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      };

      // Build detail rows
      const riskScoreVal = u.risk_score != null ? u.risk_score : Math.round(((u.age || 0) * 0.6) + ((u.usage || 0) * 0.4));
      
      const rows = [
        ["ID",         u.id || "\u2014"],
        ["Location",   (u.location_name || "\u2014") + ", Prayagraj"],
        ["Age",        u.age ? u.age + " Years" : "\u2014"],
        ["Material",   u.material || "\u2014"],
        ["Diameter",   u.diameter_mm ? u.diameter_mm + " mm" : "\u2014"],
        ["Inspected",  formatDate(u.last_inspection)],
        ["Condition",  u.condition || "\u2014"],
        ["Risk Score", riskScoreVal + "/100"],
      ];

      const rowsHtml = rows.map(function(pair) {
        const isRiskScore = pair[0] === "Risk Score";
        return (
          '<div style="display:flex;justify-content:space-between;font-size:12px;' +
          'padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.05);' + 
          (isRiskScore ? 'margin-top:6px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);' : '') + '">' +
          '<span style="color:#9ca3af;font-weight:600;font-family:\'Space Grotesk\',sans-serif;">' + pair[0] + ':</span>' +
          '<span style="color:' + (isRiskScore ? riskColor : '#f3f4f6') + ';font-weight:' + (isRiskScore ? '900' : '700') + ';text-align:right;' + 
          (isRiskScore ? 'font-size:15px;letter-spacing:0.02em;font-family:\'Space Grotesk\',sans-serif;' : 'max-width:140px;font-family:\'Inter\',sans-serif;') + '">' + pair[1] + '</span>' +
          '</div>'
        );
      }).join("");

      const popupHtml = (
        '<div style="font-family:\'Space Grotesk\',sans-serif;min-width:260px;overflow:hidden;border-radius:14px;background:rgba(17, 24, 39, 0.95);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 40px rgba(0,0,0,0.6);">' +
          '<div style="background:' + riskColor + ';color:#fff;font-size:11px;font-weight:900;' +
          'letter-spacing:0.1em;text-transform:uppercase;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;font-family:\'Space Grotesk\',sans-serif;">' +
            '<span>' + u.risk + ' RISK \u2014 ' + typeLabel + '</span>' +
            '<span style="background:rgba(0,0,0,0.2);padding:2px 6px;border-radius:4px;font-size:10px;">' + (u.id || 'N/A') + '</span>' +
          '</div>' +
          '<div style="padding:12px 14px 8px;display:flex;flex-direction:column;gap:2px;">' +
            rowsHtml +
          '</div>' +
          '<div style="background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.08);padding:10px 14px;margin-top:4px;">' +
            '<div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;' +
            'color:' + riskColor + ';margin-bottom:6px;display:flex;align-items:center;gap:6px;font-family:\'Space Grotesk\',sans-serif;">' +
              '<span style="font-size:12px;display:inline-block;transform:translateY(-1px);">\u26a0</span> ' + probLabel + 
            '</div>' +
            '<div style="font-size:11px;color:#e5e7eb;line-height:1.5;font-weight:500;font-family:\'Inter\',sans-serif;">' + (u.action || "No immediate action required.") + '</div>' +
          '</div>' +
        '</div>'
      );

      const popup = new mapboxgl.Popup({
        offset: 25,
        className: "neo-popup-container",
        maxWidth: "280px"
      }).setHTML(popupHtml);

      const marker =
        new mapboxgl.Marker({ color })
          .setLngLat([Number(u.lng), Number(u.lat)])
          .setPopup(popup)
          .addTo(map.current);

      const markerEl = marker.getElement();
      markerEl.classList.add("glow-marker");
      markerEl.setAttribute("data-color", color);  // required for CSS glow selectors

      markersRef.current.push(marker);

      markerEl.addEventListener("click", () => {
        markersRef.current.forEach(m => {
          m.getElement().style.filter = "none";
        });
        markerEl.style.filter = `drop-shadow(0 0 10px ${riskColor}) drop-shadow(0 0 20px ${riskColor}66)`;
      });

    });

  }, [utilities]);




  return (

    <div style={{ width: "100%", height: "100%", position: "relative" }}>

      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />

    </div>

  );

}

export default MapView;