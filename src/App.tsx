import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.page";
import Game from "./pages/Game.page";
import Results from "./pages/Results.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results/:roomId" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
