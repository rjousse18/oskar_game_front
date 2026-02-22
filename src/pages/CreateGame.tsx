import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../hooks/useSocket";
import { sendMessage } from "../services/socket";
import { useGame } from "../context/GameContext";
import Layout from "../components/Layout";
import Button from "../components/Button";
import PlayerList from "../components/PlayerList";
import AnimatedTitle from "../components/AnimatedTitle";
import HomeButton from "../components/HomeButton";

const CreateGame = () => {

  // ID unique et stable pour ce client, généré une seule fois
  const clientId = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();

  // Récupération du pseudo et du code de room depuis la navigation (Home.tsx)
  const { pseudo, joinCode } = useLocation().state as {
    pseudo: string;
    joinCode?: string;
  } ?? {};

  const { roomId, setRoomId, players, setPlayers } = useGame();

  // Si joinCode est absent, c'est ce client qui crée la partie (il est l'hôte)
  const isHost = !joinCode;

  // Connexion WebSocket
  const connected = useSocket(
    clientId,
    joinCode || roomId,

    // Message privé : reçu après CREATE_ROOM, contient le roomId attribué par le serveur
    (privateMsg) => {
      console.log("PRIVATE MESSAGE :", privateMsg);

      if (privateMsg.id || privateMsg.roomId) {
        setRoomId(privateMsg.id ?? privateMsg.roomId);
      }

      if (privateMsg.players) {
        setPlayers(privateMsg.players);
      }


    },

    // Message room : broadcast à tous les joueurs (ex: mise à jour de la liste des joueurs)
    (roomMsg) => {
      console.log("ROOM MESSAGE :", roomMsg);

      if (roomMsg.players) {
        setPlayers(roomMsg.players);
      }
    }
  );

  // Une fois connecté, on envoie l'action de création ou de rejoindre la partie
  useEffect(() => {

    if (!connected) return;

    // Redirection si le pseudo est manquant (accès direct à la route sans passer par Home)
    if (!pseudo) {
      navigate("/");
      return;
    }

    if (joinCode) {
      // Le client souhaite rejoindre une room existante
      sendMessage("/app/game", {
        type: "JOIN_ROOM",
        roomId: joinCode,
        pseudo,
        clientId,
      });
    } else {
      // Le client crée une nouvelle room
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

      {/* Affichage du code de room uniquement pour l'hôte, pour qu'il puisse le partager */}
      {isHost && (
        <>
          <p>Code : <strong>{roomId}</strong></p>
        </>
      )}

      {isHost ? (
        // L'hôte peut démarrer la partie uniquement si au moins un autre joueur a rejoint
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
        // Les joueurs non-hôtes attendent que l'hôte lance la partie
        <p className="subtitle">En attente de l'hôte...</p>
      )}
    </Layout>
  );
};

export default CreateGame;
