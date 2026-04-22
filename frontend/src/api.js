import axios from "axios";

export const fetchUtilities = async () => {

  const response =
    await axios.get(
      "http://localhost:8000/utilities"
    );

  return response.data;
};