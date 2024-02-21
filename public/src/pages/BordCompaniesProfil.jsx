// BordCompaniesProfil.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderCompanies from "../components/HeaderCompanies";
import { verifyCompany, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordCompaniesProfil() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyMail, setCompanyMail] = useState(null);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    verifyCompany(cookies, navigate, removeCookie, toast, setCompanyId, setCompanyName, setCompanyMail);
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    logOut(removeCookie, navigate);
  };

  const handleChangeCompanyName = (e) => {
    setNewCompanyName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:4000/companies/${companyId}/updateName`, {
        name: newCompanyName,
      });
      // console.log("Réponse de l'API :", response);

      if (response.data.success) {
        
        setCompanyName(newCompanyName);
        toast.success("Nom de l'entreprise mis à jour.", { theme: "dark" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du nom de l'entreprise :", error);
      toast.error("Erreur lors de la mise à jour du nom de l'entreprise.");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "20rem", width: "96vw", border: "3px solid white", borderRadius: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Mon Profil</h1>
            <h3 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>{companyMail}</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }}>
              <label htmlFor="companyName" style={{ color: "white", padding: "1rem" }}>Nom de l'entreprise :</label>
              <input
                type="text"
                id="companyName"
                placeholder={companyName}
                value={newCompanyName}
                onChange={handleChangeCompanyName}
                style={{ marginBottom: "1rem" }}
              />
              <button type="submit" style={{ color: "black", marginLeft: "1rem", backgroundColor: "white", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Mettre à jour le nom de l'entreprise</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
