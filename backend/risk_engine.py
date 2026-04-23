def calculate_risk(age, usage):

    # Risk Score Calculation
    score = (age * 0.6) + (usage * 0.4)

    # HIGH RISK
    if score >= 80:

        risk = "High"
        action = "Immediate Inspection Required"

        probability = "75% - 90% Failure Risk"

        outcome = (
            "High chance of pipeline burst, "
            "water leakage, sewage overflow, "
            "or power failure if not repaired."
        )

    # MEDIUM RISK
    elif score >= 50:

        risk = "Medium"
        action = "Schedule Preventive Maintenance"

        probability = "40% - 70% Failure Risk"

        outcome = (
            "Moderate risk of cracks, blockages, "
            "or voltage interruptions over time."
        )

    # LOW RISK
    else:

        risk = "Low"
        action = "Normal Monitoring"

        probability = "10% - 30% Failure Risk"

        outcome = (
            "Low immediate risk, but minor wear "
            "may develop if inspections are skipped."
        )

    return risk, action, probability, outcome