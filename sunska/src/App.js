import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConnexionPage from "./page/ConnexionPage";
import StockBarPage from "./page/StockBarPage";
import Navbar from "./component/Navbar";
import MagasinPage from "./page/MagasinPage";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
            <Route path="/stockbar" element={<StockBarPage />} />
            <Route path="/magasin" element={<MagasinPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;