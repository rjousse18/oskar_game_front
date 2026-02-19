import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useTypewriting from "../hooks/useTypewriting";
import Layout from "../components/Layout";
import Button from "../components/Button";
import AnimatedTitle from "../components/AnimatedTitle";
import JoinGameModal from "../components/JoinGameModal";
import "../css/App.css";


const Home = () => {

  const navigate = useNavigate();

  // Inialisation du pseudo
  const placeholder = useTypewriting("Entrez votre pseudo");
  const [pseudo, setPseudo] = useState<string>("");

  // Je vérifie si un pseudo est rentré
  const isFormValid = pseudo.trim() !== "";

  // Initialisation du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers pour les boutons
  const handleCreateGame = () => {
    if (!isFormValid) return;
    console.log("CREATE", {pseudo: pseudo.trim()}); // en attendant les sockets
    navigate("/create-game", { state: { pseudo: pseudo.trim() } });
  };

  // Ouvre le popup pour entrer le code de la partie à rejoindre
  const handleJoinGameClick = () => {
    if (!isFormValid) return;
    setIsModalOpen(true); 
  };

  // Handler pour confirmer le code de la partie à rejoindre
  const handleJoinGameConfirm = (code: string) => {
    navigate("/create-game", {
      state: {
        pseudo: pseudo.trim(),
        joinCode: code
      }
    });
  };


  return (

    <Layout>
      <AnimatedTitle text="OSCARZ" />

      <form className="user-form" onSubmit={(e) => e.preventDefault()} >
        <div className="button-group">

          <input 
            className="pseudo-form"
            type="text" 
            placeholder= {placeholder}
            value={pseudo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPseudo(e.target.value)}
          />

          <Button label="CRÉER UNE PARTIE" onClick={handleCreateGame} />
          <Button label="REJOINDRE UNE PARTIE" onClick={handleJoinGameClick} />
        
        </div>
      </form>

      {/* Modal */}
      <JoinGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleJoinGameConfirm}
      />

      <footer className="app-footer">
        
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Conditions d'Utilisation</a>
          <a href="#">Credits</a>
        </div>

        <p className="footer-disclaimer">
          Les développeurs de ce site ne sont pas responsables du contenu généré par les utilisateurs. © 2026 OSCARZ
        </p>

      </footer>

    </Layout>
  );
};

export default Home;