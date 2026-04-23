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

        "fill-extrusion-color": "#aaa",

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



      /* WATER PIPELINES */

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

          "line-opacity": 0.8

        }

      });



      /* SEWAGE PIPELINES */

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



      /* ELECTRIC POLES */

      data.poles.forEach(p => {

        const el =
          document.createElement("img");

        el.src = "/electric-pole.png";

        el.style.width = "26px";

        el.style.height = "26px";

        new mapboxgl.Marker(el)

          .setLngLat([p.lng,p.lat])

          .addTo(map.current);

      });

    }

    catch(err){

      console.error("Network load failed:", err);

    }

  }




  /* UTILITY MARKERS */

  useEffect(() => {

    if (!map.current) return;

    /* Remove old markers */

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



      /* Popup UI */

      const popup =
        new mapboxgl.Popup({ offset: 25 })

        .setHTML(

          `<div style="
            font-size:13px;
            line-height:1.5;
          ">

          <b style="font-size:14px;">
            ${u.id}
          </b><br/>

          <b>Type:</b> ${u.type}<br/>

          <b>From:</b> ${u.start}<br/>

          <b>To:</b> ${u.end}<br/>

          <b>Risk:</b>
          <span style="
            color:${color};
            font-weight:bold;
          ">
          ${u.risk}
          </span><br/>

          <b>Action:</b>
          ${u.action}

          </div>`

        );



      /* DEFAULT MAPBOX MARKER (OLD STYLE) */

      const marker =
        new mapboxgl.Marker({

          color: color

        })

        .setLngLat([
          Number(u.lng),
          Number(u.lat)
        ])

        .setPopup(popup)

        .addTo(map.current);



      /* Glow Highlight */

      marker.getElement().addEventListener(
        "click",
        () => {

          markersRef.current.forEach(
            m => {

              m.getElement()
                .style.filter =
                  "none";

            }
          );

          marker.getElement().style.filter =
            "drop-shadow(0 0 8px cyan)";

        }
      );



      markersRef.current.push(marker);

    });

  }, [utilities]);




  /* 2.5D BUTTON */

  const tiltMap = () => {

    if (!map.current) return;

    map.current.easeTo({

      pitch: 60,

      bearing: -20,

      zoom: 16,

      duration: 1200

    });

  };



  /* RESET BUTTON */

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

    <div
      style={{
        width:"100%",
        height:"100%",
        position:"relative"
      }}
    >

      <div
        ref={mapContainer}
        style={{
          width:"100%",
          height:"100%"
        }}
      />



      {/* 2.5D BUTTON */}

      <button

        onClick={tiltMap}

        style={{

          position:"absolute",

          bottom:"20px",

          left:"20px",

          padding:"10px 14px",

          background:"#0077ff",

          color:"white",

          border:"none",

          borderRadius:"6px",

          cursor:"pointer",

          fontWeight:"bold"

        }}

      >

        2.5D View

      </button>



      {/* RESET BUTTON */}

      <button

        onClick={resetMap}

        style={{

          position:"absolute",

          bottom:"20px",

          left:"130px",

          padding:"10px 14px",

          background:"#555",

          color:"white",

          border:"none",

          borderRadius:"6px",

          cursor:"pointer",

          fontWeight:"bold"

        }}

      >

        Reset View

      </button>

    </div>

  );

}

export default MapView;