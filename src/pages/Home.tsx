import { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import "../App.css";


const Home = () => {

  // Inialisation des états pour le pseudo
  const [pseudo, setPseudo] = useState("");

  // Je vérifie si un pseudo est rentré
  const isFormValid = pseudo.trim() !== "";

  // Handlers pour les boutons
  const handleCreateGame = () => {
    if (!isFormValid) return;
    console.log("CREATE", {pseudo: pseudo.trim()}); // en attendant les sockets
  };

  const handleJoinGame = () => {
    if (!isFormValid) return;
    console.log("JOIN", {pseudo: pseudo.trim()}); // en attendant les sockets
  };

  
  
  return (

    <Layout>
      <h1 className="title">OSCARZ</h1>


      <form className="user-form" onSubmit={(e) => e.preventDefault()} >

        <div className="button-group">

          <input 
            className="pseudo-form"
            type="text" 
            placeholder="PSEUDO"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />

          <Button label="CRÉER UNE PARTIE" onClick={handleCreateGame} />
          <Button label="REJOINDRE UNE PARTIE" onClick={handleJoinGame} />
        
        </div>

      </form>

    </Layout>
  );
};

export default Home;