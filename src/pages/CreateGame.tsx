import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../hooks/useSocket";
import { sendMessage} from "../services/socket";
import { useGame } from "../context/GameContext";
import Layout from "../components/Layout";
import Button from "../components/Button";
import PlayerList from "../components/PlayerList";
import AnimatedTitle from "../components/AnimatedTitle";
import HomeButton from "../components/HomeButton";

const CreateGame = () => {
  const clientId = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();

  const locationState = useLocation().state as {
    pseudo: string;
    joinCode?: string;
  };

  const pseudo = locationState?.pseudo || "";
  const joinCode = locationState?.joinCode;

  const { roomId, setRoomId, players, setPlayers } = useGame();
  const isHost = !joinCode;

  // Connexion WebSocket
  const connected = useSocket(
    clientId,
    joinCode || roomId,
    (privateMsg) => {
      console.log("PRIVATE MESSAGE :", privateMsg);

      if (privateMsg.id || privateMsg.roomId) {
        setRoomId(privateMsg.id ?? privateMsg.roomId);
      }

      if (privateMsg.players) {
        setPlayers(privateMsg.players);
      }


    },
    (roomMsg) => {
      console.log("ROOM MESSAGE :", roomMsg);

      if (roomMsg.players) {
        setPlayers(roomMsg.players);
      }
    }
  );

  // Création room
  useEffect(() => {

    if (!connected) return;

    if (!pseudo) {
      navigate("/");
      return;
    }

    if (joinCode) {
      sendMessage("/app/game", {
        type: "JOIN_ROOM",
        roomId: joinCode,
        pseudo,
        clientId,
      });
    } else {
      sendMessage("/app/game", {
        type: "CREATE_ROOM",
        pseudo,
        clientId,
      });
    }
  }, [connected]);

  return (
    <Layout>
      <HomeButton />
      <AnimatedTitle text="OSCARZ" />
      <PlayerList players={players} />

      {isHost && (
        <>
          <p>Code : <strong>{roomId}</strong></p>
        </>
      )}

      {isHost ? (
        players.length > 1 ? (
          <Button
            label="Démarrer la partie"
            onClick={() =>
              sendMessage("/app/game", {
                type: "START_GAME",
                roomId,
                clientId,
              })
            }
          />
        ) : (
          <p className="subtitle">En attente d'autres joueurs...</p>
        )
      ) : (
        <p className="subtitle">En attente de l'hôte...</p>
      )}
    </Layout>
  );
};

export default CreateGame;
