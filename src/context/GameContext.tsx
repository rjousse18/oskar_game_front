import { createContext, useContext, useState } from "react";
import type { GameState, Player, Prediction } from "../types";

/*
  Ici on étend GameState avec les setters React correspondants!!!
  C'est pour permettre la mise à jour de l'état global depuis n'importe quel composant enfant
*/
interface GameContextType extends GameState {
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setHostId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPredictions: React.Dispatch<React.SetStateAction<Prediction[]>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

/* Création du context */
const GameContext = createContext<GameContextType | undefined>(undefined);

/* Provider global */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [hostId, setHostId] = useState<string | undefined>();
  const [step, setStep] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        roomId,
        players,
        inProgress,
        hostId,
        predictions,
        step,
        setRoomId,
        setPlayers,
        setInProgress,
        setHostId,
        setPredictions,
        setStep,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

/* Hook personnalisé pour utiliser le context */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return context;
};
