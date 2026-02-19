import { createContext, useContext, useState } from "react";
import type { GameState, Player, Category } from "../types";

/* 
  Type du context :
  - On reprend GameState
  - On ajoute les setters React
*/
interface GameContextType extends GameState {
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    setCurrentCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
    setInProgress: React.Dispatch<React.SetStateAction<boolean>>;
    setHostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/* Création du context */
const GameContext = createContext<GameContextType | undefined>(undefined);

/* Provider global */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [roomId, setRoomId] = useState<string>("");
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | undefined>();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [hostId, setHostId] = useState<string | undefined>();

    return (
        <GameContext.Provider
        value={{
            roomId,
            players,
            currentCategory,
            inProgress,
            hostId,
            setRoomId,
            setPlayers,
            setCurrentCategory,
            setInProgress,
            setHostId
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
