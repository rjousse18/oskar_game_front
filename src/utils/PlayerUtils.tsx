import { Player } from "../types";

export function isPlayerUpToDatePrediction(player: Player | undefined, step: number) {
    console.log(player, step);

    if(player === undefined) 
        return false;

    console.log(player.movieItems.length === step + 1);
    return player.movieItems.length === step + 1;
}