import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
