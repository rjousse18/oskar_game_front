import { MinimizedPlayer } from "./minimized_player.type";
import { PredictionResults } from "./prediction_results.type";

export type Results = {
  roomId: string;
  players: MinimizedPlayer[];
  predictionResults: PredictionResults[];
};
