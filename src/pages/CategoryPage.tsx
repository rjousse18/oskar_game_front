import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {Player, Nominee, CategoryLocationState} from "../types";
import Layout from "../components/Layout";
import HomeButton from "../components/HomeButton";
import "../css/CategoryPage.css";


const CategoryPage = () => {
  const { state } = useLocation();

  // Récupération du state passé depuis la page pécédente
  // players : id, pseudo, color, hasVoted
  // currentPlayerId : id du joueur qui vote
  const {
    players = [], 
    currentPlayerId = "",
  } = (state as CategoryLocationState) ?? {};

  // Nommés (en dur pour l'instant)
  const nominees: Nominee[] = [
    { id: "n1", artist: "Chloé Zhao",           film: "Hamnet" },
    { id: "n2", artist:"Ryan Coogler" ,         film: "Sinners" },
    { id: "n3", artist: "Josh Safdie",          film: "Marty Supreme" },
    { id: "n4", artist: "Paul Thomas Anderson", film: "Une bataille après l'autre" },
    { id: "n5", artist: "Joachim Trier",        film: "Valeur sentimentale" },
  ];

  // Catégorie (en dur pour l'instant)
  const categoryName = "MEILLEURE RÉALISATION";

  // TEST EN LOCAL
  // J'ai dupliqué la liste des joueurs en local pour pouvoir tester en attendant les sockets
  const [localPlayers, setLocalPlayers] = useState<Player[]>(players);
  const slots = Array.from(
  { length: 8 },
  (_, i) => localPlayers[i] ?? null
);

  // Rempli jusqu'à 8 emplacements pour l'affichage des étoiles
  /*
  const slots: (Player | null)[] = Array.from(
    { length: 8 },
    (_, i) => players[i] ?? null
  );
  */

  // Je définis les states pour le vote:
  // selected pour le choix du joueur
  const [selected, setSelected] = useState<string | null>(null);

  //confirmed pour bloquer le vote après confirmation
  const [confirmed, setConfirmed] = useState(false);

  // Fonction de sélection d'un nominé (uniquement si pas encore confirmé)
  const handleSelect = (id: string) => {
    if (confirmed) return;
    setSelected(id);
  };

  // Fonction de confirmation du vote 
  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);

    // Simulation du vote, le joueur courant passe en "hasVoted: true"
    setLocalPlayers((prev) =>
    prev.map((p) =>
      p.id === currentPlayerId
        ? { ...p, hasVoted: true }
        : p
    )
  );
    console.log("VOTE", { currentPlayerId, nomineeId: selected }); // en attendant le socket 
  };


  return (

    <Layout>

      <HomeButton />

      <div className="category-wrapper">

        <h1 className="category-title">{categoryName}</h1>

        {/* 
        ETOILES DES JOUEURS 
        - Vide, opaque = Slot vide car il y'a moins de 8 joueurs
        - Blanche = Slot pour un joueur présent qui n'a pas encore voté
        - Colorée = Slot pour un joueur présent qui a voté
        */}
        <div className="players-row-cat">
          {slots.map((player, i) => (
            <div
              key={player ? player.id : i}
              className={`player-star-cat ${
                player?.hasVoted ? "voted" : ""
              } ${!player ? "empty" : ""}`}
              style={{
                "--player-color": player?.color || "#ffffff",
              } as React.CSSProperties}
            >
              {/* petit dessin des étoiles*/}
              <svg viewBox="0 0 24 24">
                <path d="M12 2l2.9 6.1 6.7.6-5 4.3 1.5 6.5L12 16.9 5.9 19.5l1.5-6.5-5-4.3 6.7-.6L12 2z"/>
              </svg>
            </div>
          ))}
        </div>


        {/* NOMINÉS */}
        <div className="nominees-grid">
          {nominees.map((n) => (
            <button
              key={n.id}
              className={[
                "nominee-card",
                selected === n.id ? "selected" : "",
                confirmed ? "locked" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(n.id)}
              disabled={confirmed}
            >
              <span className="nominee-artist">{n.artist}</span>
              <br />
              <span className="nominee-film">{n.film}</span>
            </button>
          ))}
        </div>

        {!confirmed ? (
          <button
            className={`confirm-btn ${selected ? "active" : ""}`}
            disabled={!selected}
            onClick={handleConfirm}
          >
            ✔ Confirmer ✔
          </button>
        ) : (
          <p className="subtitle">
            Vote enregistré, en attente des autres joueurs…
          </p>
        )}
      </div>
  </Layout>
  );
};

export default CategoryPage;