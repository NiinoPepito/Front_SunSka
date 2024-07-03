import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ConnexionPage from "./page/ConnexionPage";
import StockBarPage from "./page/StockBarPage";
import MagasinPage from "./page/MagasinPage";
import StatistiquesPage from "./page/StatistiquesPage";
import CommandesPage from "./page/CommandesPage";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
          <Route path="/stockbar" element={<StockBarPage />} />
          <Route path="/magasin" element={<MagasinPage />} />
          <Route path="/statistiques" element={<StatistiquesPage />} />
          <Route path="/commandes" element={<CommandesPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;