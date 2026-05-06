/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

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

      const res = await axios.get(
        "http://127.0.0.1:8000/network"
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

  useEffect(() => {

    if (!map.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    utilities.forEach(u => {

      if (!u.lat || !u.lng) return;

      let color = "green";
      if (u.risk === "Medium") color = "#eab308";
      if (u.risk === "High") color = "red";

      const popupHtml = `...`; // KEEP YOUR SAME UI HERE

      const popup = new mapboxgl.Popup({
        offset: 25,
        className: "neo-popup-container"
      }).setHTML(popupHtml);

      const marker = new mapboxgl.Marker({ color })
        .setLngLat([Number(u.lng), Number(u.lat)])
        .setPopup(popup)
        .addTo(map.current);

      const markerEl = marker.getElement();
      markerEl.classList.add("glow-marker");
      markerEl.dataset.color = color;

      markersRef.current.push(marker);

      markerEl.addEventListener("click", () => {
        markersRef.current.forEach(m => {
          m.getElement().style.filter = "none";
        });

        markerEl.style.filter = "drop-shadow(0 0 8px cyan)";
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