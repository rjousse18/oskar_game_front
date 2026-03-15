import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.page";
import Game from "./pages/Game.page";
import Results from "./pages/Results.page";
import Rules from "./pages/Rules.page";
import Credits from "./pages/Credits.page";
import Conditions from "./pages/Conditions.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results/:roomId" element={<Results />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/conditions" element={<Conditions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
