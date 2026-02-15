import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import type {Player} from "../types";
import Layout from "../components/Layout";
import Button from "../components/Button";
import PlayerList from "../components/PlayerList";
import AnimatedTitle from "../components/AnimatedTitle";
import HomeButton from "../components/HomeButton";
import "../css/App.css";



// Couleurs pour les joueurs
const colors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#4caf50", "#ff9800", "#795548"];


const CreateGame = () => {

  // Initialisation du socket
  const socket = useSocket();

  // On récupère le pseudo 
  const navigate = useNavigate();
  const pseudo = useLocation().state?.pseudo || "";

  // Inialisation du code de la partie
  const [gameCode, setGameCode] = useState<string>(""); 
  
  // Inialisation de la liste des joueurs
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {

    // Si pas de socket ou de pseudo, redirection vers l'accueil
    if (!pseudo) navigate("/");

    // En attendant les sockets, on simule la création de la partie avec un code aléatoire
    console.log("Création de la partie pour", pseudo);
    setGameCode("A1B2");

    // Ajouter le créateur de la partie avec une couleur aléatoire
    const color = colors[Math.floor(Math.random() * colors.length)];
    setPlayers([{ id: "1", pseudo, color }]);

  }, [pseudo]);


  // En attendant les sockets, j'ai fait une fonction qui simule l'arrivée des joueurs jusqu'à 8 max
  useEffect(() => {
    if (players.length >= 8) return;
    const timer = setTimeout(() => {
      const newPlayer: Player = {
        id: (players.length + 1).toString(),
        pseudo: `Joueur${players.length + 1}`,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setPlayers((prev) => [...prev, newPlayer]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [players]);



  return (
    <Layout>

      <HomeButton />
      
      <AnimatedTitle text="OSCARZ" />
      
      <PlayerList players={players} />

      <div className="game-container">
        <div className="main-section">
          <p>Code de la partie : <strong>{gameCode}</strong></p>
        </div>
      </div>

      {players.length === 1 ? (
        <p className="subtitle">En attente d'autres joueurs...</p>
      ) : (
      <Button
        label="Démarrer la partie"
        onClick={() =>
          navigate("/category", {
            state: {
              players,
              gameCode,
              currentPlayerId: players[0]?.id, // le créateur
            },
          })
        }
      />
      )}
    </Layout>
  );
};

export default CreateGame;
