import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ConnexionPage from "./page/ConnexionPage";
import StockBarPage from "./page/StockBarPage";
import MagasinPage from "./page/MagasinPage";
import BarList from "./component/magasin/BarList";
import BarDetail from "./component/magasin/BarDetail";
import StatistiquesPage from "./page/StatistiquesPage";
import CommandesPage from "./page/CommandesPage";
import CommandePage from "./page/CommandePage";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
            <Route path="/stockbar" element={<StockBarPage />} />
            <Route path="/magasin" element={<MagasinPage />} />
            <Route path="/barlist" element={<BarList />} />
            <Route path="/bardetail/:id" element={<BarDetail />} />
          <Route path="/stockbar" element={<StockBarPage />} />
          <Route path="/magasin" element={<MagasinPage />} />
          <Route path="/statistiques" element={<StatistiquesPage />} />
          <Route path="/commandes" element={<CommandesPage />} />
          <Route path="/commande/:id" element={<CommandePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;