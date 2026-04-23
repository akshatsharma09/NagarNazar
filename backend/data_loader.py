import csv

def load_data():

    utilities = []

    with open(
        "sample_data.csv",
        newline="",
        encoding="utf-8"
    ) as csvfile:

        reader = csv.DictReader(csvfile)

        for row in reader:

            utilities.append({

                "id": row["id"],

                "type": row["type"],

                "lat": float(row["lat"]),

                "lng": float(row["lng"]),

                "age": int(row["age"]),

                "usage": int(row["usage"]),

                # KEEP group as STRING
                "group": row["group"],

                # Optional start/end fields
                "start": row.get("start","Unknown"),

                "end": row.get("end","Unknown")

            })

    return utilities