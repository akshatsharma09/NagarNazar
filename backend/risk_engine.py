def calculate_risk(age, usage, utility_type):

    # Risk Score Calculation
    score = (age * 0.6) + (usage * 0.4)

    # -------------------------
    # HIGH RISK
    # -------------------------
    if score >= 80:

        risk = "High"

        probability = "75% - 90% Failure Risk"

        condition = "Poor"

        # Type-specific outcomes
        if utility_type == "Water":

            action = (
                "High probability of pipeline leakage "
                "or major pipe burst."
            )

        elif utility_type == "Sewage":

            action = (
                "High probability of sewage blockage "
                "or overflow incident."
            )

        elif utility_type == "Electricity":

            action = (
                "High probability of power failure "
                "or cable breakdown."
            )

        outcome = (
            "Immediate intervention recommended "
            "to prevent service disruption."
        )


    # -------------------------
    # MEDIUM RISK
    # -------------------------
    elif score >= 50:

        risk = "Medium"

        probability = "40% - 70% Failure Risk"

        condition = "Fair"

        if utility_type == "Water":

            action = (
                "Moderate risk of minor leakage "
                "or pipe weakening."
            )

        elif utility_type == "Sewage":

            action = (
                "Moderate risk of partial blockage "
                "or slow drainage."
            )

        elif utility_type == "Electricity":

            action = (
                "Moderate risk of voltage fluctuation "
                "or local outages."
            )

        outcome = (
            "Preventive maintenance recommended "
            "within scheduled cycle."
        )


    # -------------------------
    # LOW RISK
    # -------------------------
    else:

        risk = "Low"

        probability = "10% - 30% Failure Risk"

        condition = "Good"

        if utility_type == "Water":

            action = (
                "Low risk — pipeline functioning "
                "within safe limits."
            )

        elif utility_type == "Sewage":

            action = (
                "Low risk — sewage flow stable "
                "without blockage signs."
            )

        elif utility_type == "Electricity":

            action = (
                "Low risk — power line stable "
                "and operating normally."
            )

        outcome = (
            "Routine monitoring sufficient."
        )

    return (
        risk,
        action,
        probability,
        outcome,
        condition
    )