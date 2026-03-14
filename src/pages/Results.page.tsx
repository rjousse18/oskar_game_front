import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResultsService } from "../services/results.servce";
import { Results } from "../types/results.type";
import Leaderboard from "../components/Leaderboard";
import HomeButton from "../components/HomeButton";
import "../css/Results.css";

const ResultsPage = () => {
  let { roomId } = useParams<{ roomId: string }>();
  const [resultsState, setResultsState] = useState<Results | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  const fetchResults = async (roomId: string) => {
    try {
      setResultsState(await ResultsService.getResults(roomId));
    } catch (error) {
      setErrorState("Failed to fetch results. Please try again later." + error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchResults(roomId);
    }
  }, [roomId]);

  return (
    <>
      <HomeButton />
      {errorState ? (
        <p className="error">{errorState}</p>
      ) : resultsState ? (
        <Leaderboard results={resultsState} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ResultsPage;
