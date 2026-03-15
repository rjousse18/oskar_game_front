import { useEffect, useState } from "react";
import { Results } from "../types/results.type";
import CrownIcon from "./icons/CrownIcon";

interface LeaderboardProps {
  results: Results;
}

type PlayerScore = {
  pseudo: string;
  isWinner: boolean;
  score: number;
};

const Leaderboard = ({ results }: LeaderboardProps) => {
  const [isLeaderboardState, setIsLeaderboardState] = useState(false);
  const [playerScoresState, setPlayerScoresState] = useState<PlayerScore[]>([]);

  useEffect(() => {
    if (
      results.predictionResults.length === results.players[0].movieItems.length
    ) {
      let tempPlayerScores: PlayerScore[] = [];
      const allWinnerIds = new Set(
        results.predictionResults.map(
          (prediction) => prediction.winnerMovieItemId,
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
        tempPlayerScores.push({
          pseudo: player.pseudo,
          score,
          isWinner: false,
        });
      });

      tempPlayerScores = tempPlayerScores.toSorted((a, b) => b.score - a.score);

      tempPlayerScores.forEach((playerScore) => {
        if (playerScore.score === tempPlayerScores[0].score) {
          playerScore.isWinner = true;
        }
      });

      // Tri du playerScoresState par score décroissant + set du playerScoresState
      setPlayerScoresState(tempPlayerScores);

      setIsLeaderboardState(true);
    }
  }, [results]);

  return isLeaderboardState ? (
    <>
      <p className="leaderboard-title">Classement</p>
      <div className="leaderboard-main">
        <div className="leaderboard-container">
          {playerScoresState.length > 0 ? (
            <>
              {playerScoresState.map((playerScore, index) => (
                <div
                  className="leaderboard-entry"
                  key={"leaderboard_entry_" + index}
                >
                  <p
                    className={
                      "leaderboard-pseudo" + (playerScore.isWinner && " winner")
                    }
                  >
                    {playerScore.isWinner && <CrownIcon />} {playerScore.pseudo}
                  </p>
                  <p
                    className={
                      "leaderboard-score" + (playerScore.isWinner && " winner")
                    }
                  >
                    {playerScore.score} point{playerScore.score > 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </div>
    </>
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
