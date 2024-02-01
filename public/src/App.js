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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/homePage" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/registerCompanies" element={<RegisterCompanies />} />
        <Route exact path="/registerAdmin" element={<RegisterAdmin />} />
        <Route exact path="/loginUsers" element={<LoginUsers />} />
        <Route exact path="/loginCompanies" element={<LoginCompanies />} />
        <Route exact path="/loginAdmin" element={<LoginAdmin />} />
        <Route exact path="/" element={<BordUsers />} />
        <Route exact path="/profil" element={<BordUsersProfil />} />
        <Route exact path="/cand" element={<BordUsersCand />} />
        <Route exact path="/company" element={<BordCompanies />} />
        <Route exact path="/company/profil" element={<BordCompaniesProfil />} />
      </Routes>
    </BrowserRouter>
  );
}
