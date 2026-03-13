import { useEffect, useState } from "react";
import { Results } from "../types/results.type";

interface LeaderboardProps {
  results: Results;
}

const Leaderboard = ({ results }: LeaderboardProps) => {
  const [isLeaderboardState, setIsLeaderboardState] = useState(false);

  useEffect(() => {
    console.log(results);
    if (
      results.predictionResults.length === results.players[0].movieItems.length
    ) {
      setIsLeaderboardState(true);
    }
  }, [results]);

  return isLeaderboardState ? (
    <div className="leaderboard-container">Chargement des resultats...</div>
  ) : (
    <>
      <p className="title">Les résultats de la partie :</p>
      {results.players.map((player, index) => {
        return (
          <div className="result-group" key={"result_group_" + index}>
            <p className="result-pseudo">{player.pseudo}</p>
            {player.movieItems.map((movieItem, index) => (
              <div
                className="result-sub-group"
                key={"result_sub_group_" + index}
              >
                <p className="result-title">{movieItem.categoryName}:</p>
                <p>{movieItem.nominee}</p>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Leaderboard;
