import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "#";

function MapView({ utilities }) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  /* CREATE MAP */

  useEffect(() => {

    if (map.current) return;

    map.current = new mapboxgl.Map({

      container: mapContainer.current,

      style: "mapbox://styles/mapbox/streets-v12",

      center: [81.8463, 25.4358],

      zoom: 12,

      pitch: 0,

      bearing: 0,

      antialias: true

    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    /* ADD 3D BUILDINGS */

    map.current.on("load", () => {

      const layers =
        map.current.getStyle().layers;

      let labelLayerId;

      for (let i = 0; i < layers.length; i++) {

        if (
          layers[i].type === "symbol" &&
          layers[i].layout["text-field"]
        ) {

          labelLayerId =
            layers[i].id;

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

    });

  }, []);

  /* ADD MARKERS */

  useEffect(() => {

    if (!map.current) return;

    /* Remove old markers */

    markersRef.current.forEach(
      marker => marker.remove()
    );

    markersRef.current = [];

    const bounds =
      new mapboxgl.LngLatBounds();

    utilities.forEach(u => {

      const lat = Number(u.lat);
      const lng = Number(u.lng);

      if (isNaN(lat) || isNaN(lng))
        return;

      /* RISK COLOR */

      let color = "green";

      if (u.risk === "Medium")
        color = "yellow";

      if (u.risk === "High")
        color = "red";

      /* POPUP */

      const popup =
        new mapboxgl.Popup({
          offset: 25
        }).setHTML(

          `<b>Pipeline ID:</b> ${u.id}<br/>
           <b>Type:</b> ${u.type}<br/>
           <b>Risk Level:</b> ${u.risk}<br/>
           <b>Action:</b> ${u.action}`

        );

      /* MARKER */

      const marker =
        new mapboxgl.Marker({
          color: color
        })

        .setLngLat([lng, lat])

        .setPopup(popup)

        .addTo(map.current);

      markersRef.current.push(marker);

      bounds.extend([lng, lat]);

    });

    /* AUTO FIT */

    if (!bounds.isEmpty()) {

      map.current.fitBounds(
        bounds,
        {
          padding: 60,
          maxZoom: 15
        }
      );

    }

  }, [utilities]);

  /* BUTTON FUNCTIONS */

  const tiltMap = () => {

    if (!map.current) return;

    map.current.easeTo({

      pitch: 60,

      bearing: -25,

      zoom: 16,

      duration: 1200

    });

  };

  const resetMap = () => {

    if (!map.current) return;

    map.current.easeTo({

      pitch: 0,

      bearing: 0,

      zoom: 13,

      duration: 1200

    });

  };

  /* UI */

  return (

    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >

      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%"
        }}
      />

      {/* 2.5D BUTTON */}

      <button

        onClick={tiltMap}

        style={{

          position: "absolute",

          bottom: "80px",

          left: "15px",

          padding: "8px 14px",

          background: "#3498db",

          color: "white",

          border: "none",

          borderRadius: "6px",

          cursor: "pointer",

          zIndex: 2

        }}

      >

        2.5D View

      </button>

      {/* RESET BUTTON */}

      <button

        onClick={resetMap}

        style={{

          position: "absolute",

          bottom: "40px",

          left: "15px",

          padding: "8px 14px",

          background: "#2ecc71",

          color: "white",

          border: "none",

          borderRadius: "6px",

          cursor: "pointer",

          zIndex: 2

        }}

      >

        Reset View

      </button>

    </div>

  );

}

export default MapView;