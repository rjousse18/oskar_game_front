import HomeButton from "../components/HomeButton";
import "../css/credits.css";

const Credits = () => {
  return (
    <>
      <HomeButton />
      <div className="credits-container">
        <h1 className="credits-title">🎬 Crédits</h1>
        <p className="credits-subtitle">
          Oskarz est le fruit d’une collaboration passionnée. Merci à toutes les
          personnes qui ont contribué à ce projet.
        </p>

        <div className="credits-list">
          <div className="credits-item">
            <div className="credits-role">
              Créateur & Développeur Full Stack
            </div>
            <div className="credits-name">Rémi Joussé</div>
            <div className="credits-description">
              Concept original, développement front-end et back-end, gestion du
              projet.
            </div>
          </div>

          <div className="credits-item">
            <div className="credits-role">Design & Expérience Utilisateur</div>
            <div className="credits-name">Pauline Bourdon</div>
            <div className="credits-description">
              Identité visuelle, maquettes, et direction artistique.
            </div>
          </div>

          <div className="credits-item">
            <div className="credits-role">Développement Front-end</div>
            <div className="credits-name">Élie Guitton</div>
            <div className="credits-description">
              Intégration, composants React, et optimisations.
            </div>
          </div>
        </div>

        <div className="credits-ai">
          <div className="credits-ai-title">🤖 Remerciements spéciaux</div>
          <p>
            Utilisation de <strong>Claude</strong> et <strong>Mistral</strong>{" "}
            pour la résolution de bugs complexes, la génération de fichiers de
            mise en production, et la génération propre des textes statiques
            (règles, crédits, etc.)
          </p>
        </div>

        <div className="credits-footer">
          © 2026 Oskarz – Tous droits réservés.
        </div>
      </div>
    </>
  );
};

export default Credits;
