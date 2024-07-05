import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ConnexionPage from "./page/ConnexionPage";
import StockBarPage from "./page/StockBarPage";
import ProductsPage from "./page/Admin/Products/ProductsPage";
import MagasinPage from "./page/magasin/MagasinPage";
import BarDetailPage from "./page/magasin/BarDetailPage";
import BarListPage from "./page/magasin/BarListPage";
import StatistiquesPage from "./page/StatistiquesPage";
import CommandesPage from "./page/CommandesPage";
import AccountsPage from "./page/Admin/Accounts/AccountsPage";
import CreateProductsPage from "./page/Admin/Products/CreateProductsPage";
import CreateAccountsPage from "./page/Admin/Accounts/CreateAccountsPage";
import UpdatePasswordPage from "./page/Admin/Accounts/UpdatePasswordPage";
import BuildingsPage from "./page/Admin/Bar/BuildingsPage";
import CreateBuildingsPage from "./page/Admin/Bar/CreateBuildingsPage";
import AssignedUserToBuildingPage from "./page/Admin/Bar/AssignedUserToBuildingPage";
import SeuilAlertePage from "./page/SeuilAlertePage";
import CommandeDetailsInProgressPage from "./page/CommandeDetailsInProgressPage";
import CommandeDetailsPastPage from "./page/CommandeDetailsPastPage";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionPage />} />
            <Route path="/stockbar" element={<StockBarPage />} />
            <Route path="/magasin" element={<MagasinPage />} />
            <Route path="/barlist" element={<BarListPage />} />
            <Route path="/bardetail/:id" element={<BarDetailPage />} />
            <Route path="/stockbar" element={<StockBarPage />} />
            <Route path="/magasin" element={<MagasinPage />} />
            <Route path="/statistiques" element={<StatistiquesPage />} />
            <Route path="/commandes" element={<CommandesPage />} />
          <Route path="/commandedetailsinprogress/:id" element={<CommandeDetailsInProgressPage />} />
          <Route path="/commandedetailspast/:id" element={<CommandeDetailsPastPage />} />
            <Route path="/produit" element={<ProductsPage />} />
            <Route path="/createProduit" element={<CreateProductsPage />} />
            <Route path="/compte" element={<AccountsPage />} />
            <Route path="/createCompte" element={<CreateAccountsPage />} />
            <Route path="/:id/password" element={<UpdatePasswordPage />} />
            <Route path="/seuilalerte" element={<SeuilAlertePage />} />
            <Route path="/building" element={<BuildingsPage />} />
            <Route path="/createBuilding" element={<CreateBuildingsPage />} />
            <Route path="/building/:id" element={<AssignedUserToBuildingPage />} />


        </Routes>
      </BrowserRouter>
  );
}

export default App;