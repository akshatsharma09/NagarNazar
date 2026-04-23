import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =process.env.REACT_APP_MAPBOX_TOKEN;

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

    map.current.on("load", async () => {

      add3DBuildings();

      await loadNetwork();

    });

  }, []);

  /* 3D BUILDINGS */

  function add3DBuildings() {

    const layers =
      map.current.getStyle().layers;

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

        "fill-extrusion-color": "#cccccc",

        "fill-extrusion-height": ["get","height"],

        "fill-extrusion-base": ["get","min_height"],

        "fill-extrusion-opacity": 0.6

      }

    }, labelLayerId);

  }

  /* LOAD NETWORK */

  async function loadNetwork() {

    try {

      const res =
        await axios.get(
          "http://127.0.0.1:8000/network"
        );

      const data = res.data;

      /* WATER */

      map.current.addSource(
        "water-network",
        {
          type: "geojson",
          data: {

            type: "FeatureCollection",

            features:
              data.water.map(line => ({

                type: "Feature",

                geometry: {
                  type: "LineString",
                  coordinates: line
                }

              }))

          }

        }
      );

      map.current.addLayer({

        id: "water-layer",

        type: "line",

        source: "water-network",

        paint: {

          "line-color": "#0077ff",

          "line-width": 4,

          "line-opacity": 0.9

        }

      });

      /* SEWAGE */

      map.current.addSource(
        "sewage-network",
        {
          type: "geojson",
          data: {

            type: "FeatureCollection",

            features:
              data.sewage.map(line => ({

                type: "Feature",

                geometry: {
                  type: "LineString",
                  coordinates: line
                }

              }))

          }

        }
      );

      map.current.addLayer({

        id: "sewage-layer",

        type: "line",

        source: "sewage-network",

        paint: {

          "line-color": "#8000ff",

          "line-width": 3,

          "line-dasharray": [2,2]

        }

      });

    }

    catch(err){

      console.error("Network load failed:", err);

    }

  }

  /* UTILITY MARKERS */

  useEffect(() => {

    if (!map.current) return;

    markersRef.current.forEach(
      m => m.remove()
    );

    markersRef.current = [];

    utilities.forEach(u => {

      if (!u.lat || !u.lng) return;

      let color = "green";

      if (u.risk === "Medium")
        color = "orange";

      if (u.risk === "High")
        color = "red";

      /* MODERN POPUP UI */

      const popup =
        new mapboxgl.Popup({ offset: 25 })

        .setHTML(`

<div style="
font-family:Segoe UI;
padding:12px;
min-width:230px;
line-height:1.5;
">

<div style="
font-weight:bold;
font-size:15px;
color:${color};
margin-bottom:6px;
">

${u.id} — ${u.type}

</div>

<div style="
font-size:13px;
">

📍 <b>Location:</b><br/>
${u.location_name || u.start}<br/><br/>

🧱 <b>Material:</b>
${u.material || "N/A"}<br/>

📏 <b>Diameter:</b>
${u.diameter_mm || "N/A"} mm<br/>

⏳ <b>Age:</b>
${u.age} Years<br/>

🛠 <b>Last Inspection:</b><br/>
${u.last_inspection || "N/A"}<br/><br/>

⚠ <b>Condition:</b>
<span style="
color:${
u.condition==="Critical"
?"red":
u.condition==="Moderate"
?"orange":
"green"
};
font-weight:bold;
">

${u.condition || "Good"}

</span>

<br/><br/>

<b>Risk Level:</b>
<span style="
color:${color};
font-weight:bold;
">
${u.risk}
</span>

<br/>

<b>Action:</b><br/>
${u.action}

</div>

</div>

`);

      const marker =
        new mapboxgl.Marker({ color })

        .setLngLat([
          Number(u.lng),
          Number(u.lat)
        ])

        .setPopup(popup)

        .addTo(map.current);

      /* Glow highlight */

      marker.getElement().addEventListener(
        "click",
        () => {

          markersRef.current.forEach(
            m => {
              m.getElement()
                .style.filter = "none";
            }
          );

          marker.getElement().style.filter =
            "drop-shadow(0 0 12px cyan)";

        }
      );

      markersRef.current.push(marker);

    });

  }, [utilities]);

  /* 2.5D */

  const tiltMap = () => {

    if (!map.current) return;

    map.current.easeTo({

      pitch: 60,

      bearing: -20,

      zoom: 16,

      duration: 1200

    });

  };

  /* RESET */

  const resetMap = () => {

    if (!map.current) return;

    map.current.easeTo({

      pitch: 0,

      bearing: 0,

      zoom: 12,

      duration: 1200

    });

  };

  return (

    <div className="mapWrapper">

      <div
        ref={mapContainer}
        className="mapContainer"
      />

      <button
        className="btnPrimary"
        onClick={tiltMap}
      >
        2.5D View
      </button>

      <button
        className="btnSecondary"
        onClick={resetMap}
      >
        Reset View
      </button>

    </div>

  );

}

export default MapView;