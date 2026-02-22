import { useEffect, useMemo, useState } from "react";
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
import { MessageType, MovieItem, Player, RoomMessage } from "../types";
import { isPlayerUpToDatePrediction } from "../utils/PlayerUtils";

const CreateGame = () => {
  // ID unique et stable pour ce client, généré une seule fois
  const clientId = useMemo(() => uuidv4(), []);
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const navigate = useNavigate();
  const {
    roomId,
    setRoomId,
    players,
    setPlayers,
    inProgress,
    setInProgress,
    predictions,
    setPredictions,
    step,
    setStep,
  } = useGame();

  // Récupération du pseudo et du code de room depuis la navigation (Home.tsx)
  const { pseudo, joinCode } =
    (useLocation().state as {
      pseudo: string;
      joinCode?: string;
    }) ?? {};

  // Si joinCode est absent, c'est ce client qui crée la partie (il est l'hôte)
  const isHost = !joinCode;

  // Connexion WebSocket
  const connected = useSocket(
    clientId,
    joinCode || roomId,

    // Message privé : reçu après CREATE_ROOM, contient le roomId attribué par le serveur
    (privateMsg: RoomMessage) => {
      setupMessageData(privateMsg);
    },

    // Message room : broadcast à tous les joueurs (ex: mise à jour de la liste des joueurs)
    (roomMsg: RoomMessage) => {
      setupMessageData(roomMsg);
    },
  );

  const setupMessageData = (roomMessage: RoomMessage) => {
    console.log("ROOM MESSAGE :", roomMessage);
    setCurrentPlayer(
      roomMessage.players.filter((player) => player.clientId === clientId)[0],
    );
    setPlayers(roomMessage.players);
    setRoomId(roomMessage.id);
    setInProgress(roomMessage.inProgress);
    setPredictions(roomMessage.predictions);
    setStep(roomMessage.step);
  };

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
        type: MessageType.JOIN_ROOM,
        roomId: joinCode,
        pseudo,
        clientId,
        movieItem: null,
      });
    } else {
      // Le client crée une nouvelle room
      sendMessage("/app/game", {
        type: MessageType.CREATE_ROOM,
        pseudo,
        clientId,
        roomId: null,
        movieItem: null,
      });
    }
  }, [connected]);

  const returnMovieTitle = (movieItem: MovieItem) => {
    let finalReturn = "";
    if (
      movieItem.movie.title !== "" &&
      movieItem.nominee.toLowerCase() !== movieItem.movie.title.toLowerCase()
    ) {
      finalReturn += ` (${movieItem.movie.title})`;
    }

    if (
      movieItem.movie.original_title !== "" &&
      movieItem.nominee.toLowerCase() !==
        movieItem.movie.original_title.toLowerCase()
    ) {
      finalReturn += ` (${movieItem.movie.original_title})`;
    }

    return finalReturn;
  };

  return (
    <Layout>
      <HomeButton />
      <AnimatedTitle text="OSCARZ" />
      <PlayerList players={players} isRoomInProgress={inProgress} step={step} />

      {inProgress ? (
        <>
          <p>{predictions[step].category_name}</p>
          {predictions[step].movieItems.map((movieItem) => (
            <Button
              key={`movie_item_list_${movieItem.movieItemId}`}
              label={`${movieItem.nominee} ${returnMovieTitle(movieItem)}`}
              disabled={isPlayerUpToDatePrediction(currentPlayer, step)}
              onClick={() =>
                sendMessage("/app/game", {
                  type: MessageType.SEND_PREDICTION,
                  clientId,
                  pseudo,
                  roomId,
                  movieItem,
                })
              }
            />
          ))}
        </>
      ) : (
        <>
          {/* Affichage du code de room uniquement pour l'hôte, pour qu'il puisse le partager */}
          {isHost && (
            <>
              <p>
                Code : <strong>{roomId}</strong>
              </p>
            </>
          )}

          {isHost &&
            // L'hôte peut démarrer la partie uniquement si au moins un autre joueur a rejoint
            (players.length > 1 ? (
              <Button
                label="Démarrer la partie"
                onClick={() =>
                  sendMessage("/app/game", {
                    type: MessageType.START_GAME,
                    roomId,
                    clientId,
                    pseudo,
                    movieItem: null,
                  })
                }
              />
            ) : (
              <p className="subtitle">En attente d'autres joueurs...</p>
            ))}
          <p className="subtitle">En attente de l'hôte...</p>
          <Button
            label="Se Mettre Prêt"
            isReady={players.length > 0 && currentPlayer?.ready}
            onClick={() =>
              sendMessage("/app/game", {
                type: MessageType.PLAYER_READY,
                roomId,
                clientId,
                pseudo,
                movieItem: null,
              })
            }
          />
        </>
      )}
    </Layout>
  );
};

export default CreateGame;
