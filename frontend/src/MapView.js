import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = "pk.eyJ1IjoiYWtzaDA3IiwiYSI6ImNtbzh6NGVjaTAzcDIyb3M4eGh2ZHluNmIifQ.v1KwsvY7PgmzIL9PAcULOg";

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

      // Extrapolate some mock data from 'u' to fill out the detailed card
      const typeDisplay = u.type === 'Water' ? 'Water Pipe' : u.type === 'Electricity' ? 'Power Line' : 'Sewer Line';
      const severityIcon = u.risk === 'High' ? '🚨' : u.risk === 'Medium' ? '⚠️' : '✅';
      // Mock data just for visual parity with screenshot request
      const ageStr = u.age ? `${u.age} Years` : Math.floor(Math.random() * 20 + 5) + ' Years';
      const materialStr = u.type === 'Water' ? 'Iron' : u.type === 'Electricity' ? 'Copper' : 'Concrete';
      const diameterStr = u.type !== 'Electricity' ? '300 mm' : 'N/A';
      const locationStr = 'Civil Lines, Prayagraj';
      const lastInspection = '10 Apr 2026';
      const conditionStr = u.risk === 'High' ? 'Poor' : u.risk === 'Medium' ? 'Fair' : 'Good';
      const riskScore = u.usage ? u.usage : Math.floor(Math.random() * 50 + 50);

      const popupHtml = `
        <div class="font-display text-xs text-black bg-white border-2 border-black neo-brutalist p-2 w-56 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div class="mb-1.5 border-b-2 border-black pb-1">
            <h4 class="text-sm font-black-900 uppercase tracking-tighter text-${color === 'red' ? 'red-600' : color === 'orange' ? 'orange-600' : 'green-600'}">
              ${u.risk} - ${typeDisplay}
            </h4>
          </div>
          
          <div class="space-y-0.5 mb-2 font-bold opacity-90">
            <div class="flex justify-between">
              <span class="text-gray-500">ID:</span> <span>${u.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Location:</span> <span class="truncate ml-2 text-right">${locationStr}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Age:</span> <span>${ageStr}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Material:</span> <span>${materialStr}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Diameter:</span> <span>${diameterStr}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Inspected:</span> <span>${lastInspection}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Condition:</span> <span>${conditionStr}</span>
            </div>
            <div class="flex justify-between text-sm mt-1 pt-1 border-t border-dashed border-gray-400">
              <span class="text-gray-600">Risk Score:</span> <span class="font-black-900 text-${color === 'red' ? 'red-600' : color === 'orange' ? 'orange-600' : 'green-600'}">${riskScore}/100</span>
            </div>
          </div>

          <div class="bg-${color === 'red' ? 'red-400' : color === 'orange' ? 'orange-400' : 'green-400'} border-2 border-black p-1.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div class="flex items-center gap-1.5 mb-1 text-[0.65rem] uppercase tracking-tight leading-none">
              <span>${severityIcon}</span>
              <span>${u.risk === 'High' ? 'High probability' : u.risk === 'Medium' ? 'Maintenance Rec.' : 'System OK'}</span>
            </div>
            <span class="text-[0.65rem] leading-normal block opacity-90 whitespace-normal break-words">${u.action}</span>
          </div>
        </div>
      `;

      const popup =
        new mapboxgl.Popup({
          offset: 25,
          className: "neo-popup-container"
        }).setHTML(popupHtml);



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

      // Add CSS glow classes for hover effects
      const markerEl = marker.getElement();
      markerEl.classList.add("glow-marker");
      markerEl.dataset.color = color;

      markersRef.current.push(marker);


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

      <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10 pb-4 pr-4">
        <button

          onClick={tiltMap}

          className="neo-brutalist bg-blue-400 font-display font-black-900 text-sm hover:bg-blue-300 transition-colors uppercase"
          style={{
            padding: "6px 12px"
          }}
        >

          2.5D View

        </button>

        {/* RESET BUTTON */}

        <button

          onClick={resetMap}

          className="neo-brutalist bg-green-400 font-display font-black-900 text-sm hover:bg-green-300 transition-colors uppercase"
          style={{
            padding: "6px 12px"
          }}

        >

          Reset View

        </button>
      </div>

    </div>

  );

}

export default MapView;