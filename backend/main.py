from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data_loader import load_data
from risk_engine import calculate_risk

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV data
data = load_data()


# ==============================
# UTILITIES API
# ==============================

@app.get("/utilities")
def get_utilities():

    result = []

    for u in data:

        # Updated unpacking (now 4 values)
        risk, action, probability, outcome = calculate_risk(
            u["age"],
            u["usage"]
        )

        result.append({

            **u,

            "risk": risk,
            "action": action,

            # NEW FIELDS FOR POPUP
            "probability": probability,
            "outcome": outcome

        })

    return result


# ==============================
# NETWORK API (LINES + POLES)
# ==============================

@app.get("/network")
def get_network():

    water_lines = []
    sewage_lines = []
    electric_lines = []
    poles = []

    grouped = {}

    # Group by utility type + group
    for u in data:

        grouped.setdefault(
            (u["type"], u["group"]),
            []
        ).append(u)

    # Build line connections
    for (t, g), items in grouped.items():

        items.sort(
            key=lambda x: x["id"]
        )

        coords = [

            [float(u["lng"]), float(u["lat"])]

            for u in items
        ]

        if t == "Water":

            water_lines.append(coords)

        elif t == "Sewage":

            sewage_lines.append(coords)

        elif t == "Electricity":

            electric_lines.append(coords)

            # Create poles
            for u in items:

                poles.append({

                    "lat": float(u["lat"]),
                    "lng": float(u["lng"])

                })

    return {

        "water": water_lines,
        "sewage": sewage_lines,
        "electric": electric_lines,
        "poles": poles

    }