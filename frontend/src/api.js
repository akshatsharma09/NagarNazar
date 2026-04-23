import axios from "axios";

export const fetchUtilities = async () => {

  const response =
    await axios.get(
      "/utilities"
    );

  return response.data;
};