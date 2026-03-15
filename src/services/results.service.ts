import axios from "axios";
import { Results } from "../types/results.type";

export const ResultsService = {
  async getResults(roomId: string): Promise<Results> {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/results/${roomId}`)
      .then((response: { data: Results }) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching results", error);
        throw error;
      });
  },
};
