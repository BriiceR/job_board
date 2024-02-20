import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import HeaderCompanies from "../components/HeaderCompanies";
import { verifyCompany, logOut } from "../utils/utilsAuth";

export default function BordCompaniesProfil() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    verifyCompany(cookies, navigate, removeCookie, toast);
    // Récupérer le nom de l'entreprise depuis le serveur et mettre à jour l'état
    // Exemple fictif, vous devez remplacer cette logique par une requête réelle vers votre serveur
    const fetchedCompanyName = "Nom de l'entreprise"; // Remplacez par la valeur réelle
    setCompanyName(fetchedCompanyName);
  }, [cookies, navigate, removeCookie, toast]);

  const handleLogout = () => {
    logOut(removeCookie, navigate);
  };

  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer la mise à jour du nom de l'entreprise au serveur
    // Exemple fictif, vous devez remplacer cette logique par une requête réelle vers votre serveur
    console.log("Nouveau nom de l'entreprise :", companyName);
    toast.success("Nom de l'entreprise mis à jour avec succès !");
  };

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "20rem", width: "96vw", border: "3px solid white", borderRadius: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Mon Profil</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }}>
              <label htmlFor="companyName" style={{ color: "white" }}>Nom de l'entreprise :</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={handleChangeCompanyName}
                style={{ marginBottom: "1rem" }}
              />
              <button type="submit">Mettre à jour le nom de l'entreprise</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
