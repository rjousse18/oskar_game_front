import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import PlayerList from "../components/PlayerList";
import "../css/App.css";

// Types pour les joueurs
interface Player {
  id: string;
  pseudo: string;
  color: string;
}

// Couleurs pour les joueurs
const colors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#4caf50", "#ff9800"];


const CreateGame = () => {

  // On récupère le pseudo
  const navigate = useNavigate();
  const pseudo = useLocation().state?.pseudo || "";

  // Inialisation du code de la partie
  const [gameCode, setGameCode] = useState<string>(""); 

  // Inialisation de la liste des joueurs
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Si pas de pseudo, redirection vers l'accueil
    if (!pseudo) navigate("/");

    // Socket pour la création de la partie et la création d'un code unique
    console.log("Création de la partie pour", pseudo);
    setGameCode("A1B2");

    // Ajouter le créateur de la partie
    const color = colors[Math.floor(Math.random() * colors.length)];
    setPlayers([{ id: "1", pseudo, color }]);
  }, [pseudo]);

    // On simule l'arrivée de nouveaux joueurs avec max 8 joueurs
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
      <h1 className="title">OSCARZ</h1>
      <PlayerList players={players} />

      <div className="game-container">
        <div className="main-section">
          <p>Code de la partie : <strong>{gameCode}</strong></p>
        </div>
      </div>

      <Button label="Démarrer la partie" onClick={() => console.log("Start game")} />
    </Layout>
  );
};

export default CreateGame;
