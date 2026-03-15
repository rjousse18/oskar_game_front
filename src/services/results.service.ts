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

  async setWinner(winnerId: number): Promise<boolean> {
    return axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/api/results/${winnerId}/won`)
      .then((response: { data: boolean }) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching results", error);
        throw error;
      });
  },
};
