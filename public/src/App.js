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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/homePage" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/registerCompanies" element={<RegisterCompanies />} />
        <Route exact path="/loginUsers" element={<LoginUsers />} />
        <Route exact path="/loginCompanies" element={<LoginCompanies />} />
        <Route exact path="/loginAdmin" element={<LoginAdmin />} />
        <Route exact path="/" element={<BordUsers />} />
      </Routes>
    </BrowserRouter>
  );
}
