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

            # Skip empty rows (important)
            if not row["lat"] or not row["lng"]:
                continue

            utilities.append({

                "id": row["id"],

                "type": row["type"],

                "lat": float(row["lat"]),

                "lng": float(row["lng"]),

                "age": int(row["age"]),

                "usage": int(row["usage"]),

                "group": row["group"],

                "start": row.get("start", "Unknown"),

                "end": row.get("end", "Unknown"),

                # NEW FIELDS
                "location_name": row.get(
                    "location_name",
                    "Unknown"
                ),

                "material": row.get(
                    "material",
                    "Unknown"
                ),

                "diameter_mm": int(
                    row.get("diameter_mm", 0)
                ),

                "last_inspection": row.get(
                    "last_inspection",
                    "Unknown"
                )

            })

    return utilities