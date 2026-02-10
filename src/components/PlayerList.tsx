import React from "react";
import "../css/PlayerList.css";

interface Player {
  id: string;
  pseudo: string;
  color: string;
}

interface Props {
  players: Player[];
}

// On affiche la liste des joueurs avec leur pseudo et une étoile de couleur unique
// Pour les grands écrans, si le nombre de joueurs dépasse 4, on affiche une deuxième colonne
const PlayerList = ({ players }: Props) => {
  return (
    <div className="player-list">
      {players.map((player) => (
        <div key={player.id} className="player-item">
          <div
            className="player-star"
            style={{ backgroundColor: player.color }}
          ></div>
          <span className="player-name">{player.pseudo}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
