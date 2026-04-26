from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data_loader import load_data
from risk_engine import calculate_risk

app = FastAPI()


# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load dataset

data = load_data()


# ===============================
# UTILITIES API
# ===============================

@app.get("/utilities")
def get_utilities():

    result = []

    for u in data:

        (
            risk,
            action,
            probability,
            outcome,
            condition
        ) = calculate_risk(
            u["age"],
            u["usage"],
            u["type"]   # NEW PARAMETER
        )

        result.append({

            **u,

            "risk": risk,
            "action": action,
            "probability": probability,
            "outcome": outcome,
            "condition": condition

        })

    return result

# ===============================
# CHAIN-BASED NETWORK
# ===============================

@app.get("/network")
def get_network():

    water_lines = []
    sewage_lines = []
    electric_lines = []
    poles = []

    grouped = {}

    # Group utilities
    for u in data:

        grouped.setdefault(
            (u["type"], u["group"]),
            []
        ).append(u)

    # Nearest-neighbor chain logic
    def chain_points(points):

        if not points:
            return []

        unused = points.copy()

        chain = []

        current = unused.pop(0)

        chain.append([
            current["lng"],
            current["lat"]
        ])

        while unused:

            nearest = min(

                unused,

                key=lambda p:

                (
                    (p["lat"] - current["lat"])**2 +
                    (p["lng"] - current["lng"])**2

                )

            )

            chain.append([
                nearest["lng"],
                nearest["lat"]
            ])

            unused.remove(nearest)

            current = nearest

        return chain


    # Build networks
    for (t, g), items in grouped.items():

        coords = chain_points(items)

        if t == "Water":

            water_lines.append(coords)

        elif t == "Sewage":

            sewage_lines.append(coords)

        elif t == "Electricity":

            electric_lines.append(coords)

            # Add poles
            for u in items:

                poles.append({

                    "lat": u["lat"],
                    "lng": u["lng"]

                })

    return {

        "water": water_lines,

        "sewage": sewage_lines,

        "electric": electric_lines,

        "poles": poles

    }