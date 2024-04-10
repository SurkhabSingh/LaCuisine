import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketPlace from "./pages/Home";

import "./App.css";

import { GameDetailsPage } from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketPlace />} />

        <Route path="/recipe/:id" element={<GameDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
