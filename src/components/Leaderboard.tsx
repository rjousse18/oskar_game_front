import { useEffect, useState } from "react";
import { Results } from "../types/results.type";

interface LeaderboardProps {
  results: Results;
}

const Leaderboard = ({ results }: LeaderboardProps) => {
  const [isLeaderboardState, setIsLeaderboardState] = useState(false);
  const [playerScoresState, setPlayerScoresState] = useState<
    Map<string, number>
  >(new Map());

  useEffect(() => {
    if (
      results.predictionResults.length === results.players[0].movieItems.length
    ) {
      let allWinnerIds = new Set(
        results.predictionResults.map(
          (prediction) => prediction.winnerMovierItemId,
        ),
      );

      results.players.forEach((player) => {
        // Je calcule le score
        let score = 0;
        player.movieItems.forEach((movieItem) => {
          if (allWinnerIds.has(movieItem.movieItemId)) {
            score++;
          }
        });

        // Je rajoute une entrée dans le playerScoresState pour le joueur avec son score
        setPlayerScoresState((prev) => new Map(prev.set(player.pseudo, score)));
      });

      console.log(playerScoresState);

      setIsLeaderboardState(true);
    }
  }, [results]);

  return isLeaderboardState ? (
    <div className="leaderboard-container">
      {playerScoresState.size > 0 ? (
        <>
          {Array.from(playerScoresState.entries()).map(
            ([pseudo, score], index) => (
              <div
                className="leaderboard-entry"
                key={"leaderboard_entry_" + index}
              >
                <p className="leaderboard-pseudo">{pseudo}</p>
                <p className="leaderboard-score">
                  {score} point{score > 1 ? "s" : ""}
                </p>
              </div>
            ),
          )}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
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
