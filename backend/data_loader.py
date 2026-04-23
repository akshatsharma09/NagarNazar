import csv

def load_data():

    data = []

    with open("sample_data.csv", newline="") as file:

        reader = csv.DictReader(file)

        for row in reader:

            data.append({

                "id": row["id"],

                "type": row["type"],

                "lat": float(row["lat"]),

                "lng": float(row["lng"]),

                "age": int(row["age"]),

                "usage": int(row["usage"]),

                "start": row["start"],

                "end": row["end"],

                "group": row["group"],

                "location_name": row["location_name"],

                "material": row["material"],

                "diameter_mm": int(row["diameter_mm"]),

                "last_inspection": row["last_inspection"],

                "condition": row["condition"]

            })

    return data