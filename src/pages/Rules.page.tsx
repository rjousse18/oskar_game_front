import HomeButton from "../components/HomeButton";
import "../css/rules.css";

const Rules = () => {
  return (
    <>
      <HomeButton />
      <div className="rules-container">
        <div className="rules-header">
          <h1 className="rules-title">🎬 Oskarz</h1>
          <p className="rules-subtitle">
            Prédis les gagnants des Oscars et défie tes amis !
          </p>
        </div>

        <div className="rules-section">
          <h2 className="rules-section-title">📜 Principe du jeu</h2>
          <div className="rules-section-content">
            <p>
              <span className="rules-highlight">Oskarz</span> est un jeu en
              ligne qui te permet de prédire les gagnants des Oscars en temps
              réel, avec tes amis. Le but ? Avoir le plus de bonnes prédictions
              et remporter la partie !
            </p>
          </div>
        </div>

        <div className="rules-section">
          <h2 className="rules-section-title">🎮 Comment jouer ?</h2>
          <div className="rules-section-content">
            <ol className="rules-list">
              <li>
                <strong>Crée ou rejoins une partie :</strong> Entre ton pseudo,
                puis crée une nouvelle partie ou rejoins une partie existante
                avec un code unique.
              </li>
              <div className="rules-example">
                Exemple de code de partie : <strong>ABC123</strong>
              </div>
              <li>
                <strong>Prépare-toi :</strong> Une fois dans la partie, clique
                sur "Prêt" pour signaler que tu es prêt à commencer.
              </li>
              <li>
                <strong>Lance la partie :</strong> Le créateur de la partie peut
                lancer le jeu une fois que tous les joueurs sont prêts.
              </li>
              <li>
                <strong>Fais tes prédictions :</strong> Pour chaque catégorie
                des Oscars, choisis le nommé que tu penses voir gagner.{" "}
                <span className="rules-highlight">
                  Attention : une fois validé, tu ne pourras plus changer ton
                  choix !
                </span>
              </li>
              <li>
                <strong>Suis la cérémonie :</strong> Une fois la partie lancée,
                plus personne ne peut rejoindre. Les résultats seront
                disponibles après l’annonce de tous les gagnants.
              </li>
            </ol>
          </div>
        </div>

        <div className="rules-section">
          <h2 className="rules-section-title">🏆 Résultats et classement</h2>
          <div className="rules-section-content">
            <p>
              Une fois la cérémonie terminée, accède aux résultats via le lien :
            </p>
            <div className="rules-example">
              <a
                href="https://oskarz.nastream.fr/results/[CODE_DE_LA_PARTIE]"
                target="_blank"
                rel="noreferrer"
              >
                https://oskarz.nastream.fr/results/[CODE_DE_LA_PARTIE]
              </a>
            </div>
            <p>Tu pourras y voir :</p>
            <ul className="rules-list">
              <li>Les prédictions de chaque joueur.</li>
              <li>Les vrais gagnants des Oscars.</li>
              <li>Le classement final avec les points de chacun.</li>
            </ul>
          </div>
        </div>

        <div className="rules-section">
          <h2 className="rules-section-title">💡 Conseils pour gagner</h2>
          <div className="rules-section-content">
            <ul className="rules-list">
              <li>Renseigne-toi sur les favoris avant de faire tes choix.</li>
              <li>
                Ne te précipite pas : une fois ton choix validé, il est
                définitif !
              </li>
              <li>Partage ton code de partie à tes amis pour les défier.</li>
            </ul>
          </div>
        </div>

        <div className="rules-footer">
          <p>Amuse-toi bien et que le meilleur gagnant gagne ! 🎉</p>
        </div>
      </div>
    </>
  );
};

export default Rules;
