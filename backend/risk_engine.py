def calculate_risk(age, usage):

    score = age * 0.6 + usage * 0.4

    if score > 70:
        return "High"

    elif score > 40:
        return "Medium"

    else:
        return "Low"