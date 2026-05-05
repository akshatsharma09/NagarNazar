from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

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

# ===============================
# REPORTS API
# ===============================

@app.get("/report/summary")
def get_report_summary():
    total = len(data)
    high = 0
    medium = 0
    low = 0
    for u in data:
        risk, _, _, _, _ = calculate_risk(u["age"], u["usage"], u["type"])
        if risk == "High":
            high += 1
        elif risk == "Medium":
            medium += 1
        else:
            low += 1
    return {"total": total, "high": high, "medium": medium, "low": low}

@app.get("/report/critical")
def get_report_critical():
    result = []
    for u in data:
        risk, action, probability, outcome, condition = calculate_risk(u["age"], u["usage"], u["type"])
        if risk == "High":
            result.append({
                **u,
                "risk": risk,
                "action": action,
                "probability": probability,
                "outcome": outcome,
                "condition": condition
            })
    return result

@app.get("/report/filter")
def get_report_filter(type: Optional[str] = None, risk: Optional[str] = None):
    result = []
    for u in data:
        r, action, probability, outcome, condition = calculate_risk(u["age"], u["usage"], u["type"])
        if type and type != "All" and u["type"] != type:
            continue
        if risk and risk != "All" and r != risk:
            continue
        result.append({
            **u,
            "risk": r,
            "action": action,
            "probability": probability,
            "outcome": outcome,
            "condition": condition
        })
    return result

# ===============================
# MAINTENANCE API
# ===============================

maintenance_tasks = {}

def init_tasks():
    global maintenance_tasks
    if not maintenance_tasks:
        for u in data:
            r, action, _, _, _ = calculate_risk(u["age"], u["usage"], u["type"])
            maintenance_tasks[u["id"]] = {
                "id": u["id"],
                "type": u["type"],
                "location": u.get("location_name", "Unknown"),
                "risk": r,
                "action": action,
                "status": "Pending"
            }

@app.on_event("startup")
def startup_event():
    init_tasks()

@app.get("/maintenance/tasks")
def get_maintenance_tasks():
    # If starting in dev mode without startup event triggering properly
    if not maintenance_tasks:
        init_tasks()
    return list(maintenance_tasks.values())

class TaskUpdate(BaseModel):
    id: str
    status: str

@app.post("/maintenance/update")
def update_task(task_update: TaskUpdate):
    if task_update.id in maintenance_tasks:
        maintenance_tasks[task_update.id]["status"] = task_update.status
        return {"success": True, "task": maintenance_tasks[task_update.id]}
    return {"success": False, "error": "Task not found"}