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

data = load_data()


@app.get("/utilities")
def get_utilities():

    result = []

    for u in data:

        risk, action = calculate_risk(
            u["age"],
            u["usage"]
        )

        result.append({
            **u,
            "risk": risk,
            "action": action
        })

    return result


@app.get("/network")
def get_network():

    water_lines = []
    sewage_lines = []
    electric_lines = []
    poles = []

    grouped = {}

    for u in data:

        grouped.setdefault(
            (u["type"], u["group"]),
            []
        ).append(u)

    for (t, g), items in grouped.items():

        items.sort(
            key=lambda x: x["id"]
        )

        coords = [
            [u["lng"], u["lat"]]
            for u in items
        ]

        if t == "Water":
            water_lines.append(coords)

        elif t == "Sewage":
            sewage_lines.append(coords)

        elif t == "Electricity":

            electric_lines.append(coords)

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