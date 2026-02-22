import { useState } from "react";
import { useGame } from "../context/GameContext";
import { sendMessage } from "../services/socket";
import Layout from "../components/Layout";
import HomeButton from "../components/HomeButton";

const CategoryPage = () => {
  const { roomId, players } = useGame();
  const [selected, setSelected] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selected) return;

    // sendMessage("/app/game", {
    //   type: "SEND_PREDICTION",
    //   roomId,
    //   nomineeId: selected,
    // });
  };

  return (
    <Layout>
      <HomeButton />

      <div className="players-row-cat">
        {players.map((player) => (
          <div
            key={`player_id_category_page_${player.clientId}`}
            className={`player-star-cat ${player.hasVoted ? "voted" : ""}`}
            style={{ "--player-color": player.color } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2l2.9 6.1 6.7.6-5 4.3 1.5 6.5L12 16.9 5.9 19.5l1.5-6.5-5-4.3 6.7-.6L12 2z"/>
            </svg>
          </div>
        ))}
      </div>

      <button disabled={!selected} onClick={handleConfirm}>
        Confirmer
      </button>
    </Layout>
  );
};

export default CategoryPage;
