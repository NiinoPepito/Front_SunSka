import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConnexionPage from "./page/ConnexionPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
