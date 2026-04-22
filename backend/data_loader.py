import pandas as pd

def load_data():

    df = pd.read_csv("sample_data.csv")

    data = df.to_dict(orient="records")

    return data