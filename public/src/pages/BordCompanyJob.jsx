import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderCompanies from "../components/HeaderCompanies";
import { verifyCompany, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordCompanyJob() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        verifyCompany(cookies, navigate, removeCookie, toast);
    }, [cookies, navigate, removeCookie, toast]);
  
    const handleLogout = () => {
      logOut(removeCookie, navigate);
  };

  const [jobData, setJobData] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(
        "http://localhost:4000/createJob",
        jobData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Annonce créée avec succès!");
        // Vous pouvez rediriger l'utilisateur vers la liste des annonces ou faire toute autre action ici
      } else {
        toast.error("Erreur lors de la création de l'annonce");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error);
      toast.error("Erreur lors de la création de l'annonce");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "20rem", width: "96vw", border: "3px solid white", borderRadius: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Mes Annonces</h1>

            // Ajoutez ici le code pour afficher les annonces

            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Créer une Annonce</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "start", padding: "1rem" }}>
                <label htmlFor="title" style={{ color: "white" }}>Titre :</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="description" style={{ color: "white" }}>Description :</label>
                <textarea
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  required
                />

                <button type="submit">Créer l'annonce</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
