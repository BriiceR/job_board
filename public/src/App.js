import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginUsers from "./pages/LoginUsers";
import BordUsers from "./pages/BordUsers";
import HomePage from "./pages/HomePage";
import "react-toastify/dist/ReactToastify.css";
import LoginCompanies from "./pages/LoginCompanies";
import RegisterCompanies from "./pages/RegisterCompanies";
import LoginAdmin from "./pages/LoginAdmin";
import BordUsersProfil from "./pages/BordUsersProfil";
import BordUsersCand from "./pages/BordUsersCand";
import BordCompanies from "./pages/BordCompanies";
import BordCompaniesProfil from "./pages/BordCompaniesProfil";
import RegisterAdmin from "./pages/RegisterAdmin";
import BordAdmin from "./pages/BordAdmin";
import BordAdminCand from "./pages/BordAdminCand";
import BordAdminComp from "./pages/BordAdminComp";
import BordCompanyJob from "./pages/BordCompanyJob";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        // home
        <Route exact path="/homePage" element={<HomePage />} />
        // register

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/registerCompanies" element={<RegisterCompanies />} />
        <Route exact path="/registerAdmin" element={<RegisterAdmin />} />

        // login
        <Route exact path="/loginUsers" element={<LoginUsers />} />
        <Route exact path="/loginCompanies" element={<LoginCompanies />} />
        <Route exact path="/loginAdmin" element={<LoginAdmin />} />

        // bord user
        <Route exact path="/" element={<BordUsers />} />
        <Route exact path="/profil" element={<BordUsersProfil />} />
        <Route exact path="/cand" element={<BordUsersCand />} />

        // bord company
        <Route exact path="/company" element={<BordCompanies />} />
        <Route exact path="/company/profil" element={<BordCompaniesProfil />} />
        <Route exact path="/company/jobs" element={<BordCompanyJob />} />

        // bord admin
        <Route exact path="/admin" element={<BordAdmin />} />
        <Route exact path="/admin/cand" element={<BordAdminCand />} />
        <Route exact path="/admin/company" element={<BordAdminComp />} />
      </Routes>
    </BrowserRouter>
  );
}
