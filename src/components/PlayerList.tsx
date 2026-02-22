import React from "react";
import "../css/PlayerList.css";
import { Player } from "../types";
import { isPlayerUpToDatePrediction } from "../utils/PlayerUtils";

interface Props {
  players: Player[];
  isRoomInProgress: boolean;
  step: number;
}

// On affiche la liste des joueurs avec leur pseudo et une étoile de couleur unique
// Pour les grands écrans, si le nombre de joueurs dépasse 4, on affiche une deuxième colonne
const PlayerList = ({ players, isRoomInProgress, step }: Props) => {
  return (
    <div className="player-list">
      {players.map((player) => (
        <div key={"player_id_list"+player.clientId} className="player-item">
          <div
            className="player-star"
            style={{ backgroundColor: player.color }}
          ></div>
          <span className={`player-name ${isRoomInProgress ? (isPlayerUpToDatePrediction(player, step) && "player-ready") : (player.ready && "player-ready")}`}>{player.pseudo}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
