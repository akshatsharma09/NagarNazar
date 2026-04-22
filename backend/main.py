from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# Allow frontend connection

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Risk Prediction Logic
# -----------------------------

def calculate_risk(age, usage):

    if age > 70 and usage > 80:
        return "High"

    elif age > 40 and usage > 50:
        return "Medium"

    else:
        return "Low"


# -----------------------------
# Action Suggestion
# -----------------------------

def suggest_action(risk):

    if risk == "High":
        return "Immediate Repair Required"

    elif risk == "Medium":
        return "Inspection Required"

    else:
        return "Normal Monitoring"


# -----------------------------
# Load CSV Data
# -----------------------------

def load_data():

    df = pd.read_csv("sample_data.csv")

    utilities = []

    for _, row in df.iterrows():

        try:

            age = int(row["age"])
            usage = int(row["usage"])

            risk = calculate_risk(age, usage)

            action = suggest_action(risk)

            utilities.append({

                "id": row["id"],
                "type": row["type"],

                "lat": float(row["lat"]),
                "lng": float(row["lng"]),

                "age": age,
                "usage": usage,

                "risk": risk,
                "action": action

            })

        except:

            continue

    return utilities


# -----------------------------
# API Endpoint
# -----------------------------

@app.get("/utilities")

def get_utilities():

    data = load_data()

    return data