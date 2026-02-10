import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTypewriting from "../hooks/useTypewriting";
import Layout from "../components/Layout";
import Button from "../components/Button";
import AnimatedTitle from "../components/AnimatedTitle";
import "../css/App.css";


const Home = () => {

  const navigate = useNavigate();

  // Inialisation du pseudo
  const placeholder = useTypewriting("Entrez votre pseudo");
  const [pseudo, setPseudo] = useState<string>("");

  // Je vérifie si un pseudo est rentré
  const isFormValid = pseudo.trim() !== "";

  // Handlers pour les boutons
  const handleCreateGame = () => {
    if (!isFormValid) return;
    console.log("CREATE", {pseudo: pseudo.trim()}); // en attendant les sockets
    navigate("/create-game", { state: { pseudo: pseudo.trim() } });
  };

  const handleJoinGame = () => {
    if (!isFormValid) return;
    console.log("JOIN", {pseudo: pseudo.trim()}); // en attendant les sockets
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
          <Button label="REJOINDRE UNE PARTIE" onClick={handleJoinGame} />
        
        </div>

      </form>

    </Layout>
  );
};

export default Home;