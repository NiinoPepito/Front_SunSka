import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ConnexionPage from "./page/ConnexionPage";
import StockBarPage from "./page/StockBarPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
            <Route path="/stockbar" element={<StockBarPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;