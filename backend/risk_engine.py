def calculate_risk(age, usage):

    score = (age * 0.6) + (usage * 0.4)

    if score >= 80:
        return "High", "Inspection Required"

    elif score >= 50:
        return "Medium", "Schedule Maintenance"

    else:
        return "Low", "Normal Monitoring"