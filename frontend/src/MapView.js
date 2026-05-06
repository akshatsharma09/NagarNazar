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

          "line-dasharray": [2, 2]

        }

      });



      /* ELECTRIC PIPELINES */

      map.current.addSource(
        "electric-network",
        {
          type: "geojson",
          data: {

            type: "FeatureCollection",

            features:
              data.electric.map(line => ({

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

        id: "electric-layer",

        type: "line",

        source: "electric-network",

        paint: {

          "line-color": "#eab308", // Yellow color for electricity

          "line-width": 3,

          "line-opacity": 0.8

        }

      });

    }

    catch (err) {

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
        color = "#eab308";

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
        <div class="font-display text-xs text-white bg-[#0F172A] border border-white/20 p-3 w-64 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-lg relative overflow-hidden backdrop-blur-md">
          <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] rounded-lg"></div>
          <div class="mb-2 border-b border-white/10 pb-2 relative z-10">
            <h4 class="text-sm font-black uppercase tracking-widest ${u.risk === 'High' ? 'text-red-500' : u.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'} flex items-center gap-2">
              <span class="w-2 h-2 rounded-full ${u.risk === 'High' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : u.risk === 'Medium' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}"></span>
              ${u.risk} - ${typeDisplay}
            </h4>
          </div>
          
          <div class="space-y-1 mb-3 font-medium text-zinc-400 relative z-10">
            <div class="flex justify-between"><span class="text-zinc-500">ID:</span> <span class="text-white">${u.id}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Location:</span> <span class="text-white truncate ml-2 text-right">${locationStr}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Age:</span> <span class="text-white">${ageStr}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Material:</span> <span class="text-white">${materialStr}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Diameter:</span> <span class="text-white">${diameterStr}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Inspected:</span> <span class="text-white">${lastInspection}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500">Condition:</span> <span class="text-white">${conditionStr}</span></div>
            <div class="flex justify-between text-sm mt-2 pt-2 border-t border-white/10">
              <span class="text-zinc-400">Risk Score:</span> <span class="font-black ${color === 'red' ? 'text-red-500' : color === 'orange' ? 'text-yellow-500' : 'text-green-500'}">${riskScore}/100</span>
            </div>
          </div>

          <div class="${color === 'red' ? 'bg-red-500/10 border-red-500/30' : color === 'orange' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'} border p-2 rounded-md relative z-10">
            <div class="flex items-center gap-2 mb-1 text-[0.7rem] uppercase tracking-widest font-bold ${color === 'red' ? 'text-red-400' : color === 'orange' ? 'text-yellow-400' : 'text-green-400'}">
              <span>${severityIcon}</span>
              <span>${u.risk === 'High' ? 'High probability' : u.risk === 'Medium' ? 'Maintenance Rec.' : 'System OK'}</span>
            </div>
            <span class="text-[0.65rem] leading-normal block text-zinc-300">${u.action}</span>
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
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    >

      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%"
        }}
      />

    </div>

  );

}

export default MapView;