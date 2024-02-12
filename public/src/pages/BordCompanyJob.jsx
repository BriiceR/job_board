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
      if (data) {
        toast.success("Annonce créée avec succès!", {
          theme: "dark",
        });
        setJobData({ title: "", description: "" });
        fetchJobs();
        // Vous pouvez rediriger l'utilisateur vers la liste des annonces ou faire toute autre action ici
      } else {
        toast.error("Erreur lors de la création de l'annonce");
        console.log("Error creating job:");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error);
      toast.error("Erreur lors de la création de l'annonce");
    }
  };

  const [jobs, setJobs] = useState([]);
  // const [companyId, setCompanyId] = useState(null);
  
  const fetchJobs = async ( ) => {
    const companyId = "65bbbf01ec632b12a3c16dc3"

    try {
      const { data } = await axios.get(`http://localhost:4000/jobs/company/${companyId}`, {
        withCredentials: true,
      });
      setJobs(data.jobs);  // Mettez à jour le state avec les annonces récupérées
      // console.log(data.jobs);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
    }
  };

  

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "black",  width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", width: "96vw", border: "3px solid white", borderRadius: "1rem", marginBottom: "2rem", minHeight: "100vh"}}>


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

            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Mes Annonces</h1>

            
            <ul>
              {jobs.map((job) => (
                <li key={job._id} style={{ display: "flex", justifyContent: "space-between",  padding: "1rem", borderBottom: "1px solid white"}}>
                  <div style={{ display: "flex" }}>
                    <h3 style={{ color: "white", paddingLeft: "1rem" }}>{job.title}</h3>
                    <p style={{ color: "white", paddingLeft: "1rem" }}>{job.description}</p>
                    <p style={{ color: "white", paddingLeft: "1rem" }}>Date : {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ paddingRight: "1rem"  }}>
                    <button style={{ color: "black", marginLeft: "1rem", backgroundColor: "white", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Modifier</button>
                    <button style={{ color: "black", marginLeft: "1rem", backgroundColor: "white",  padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Supprimer</button>
                  </div>
                </li>
              ))}
            </ul>
    

          </div>
        </div>
      </div>
    <ToastContainer position="bottom-right" />
    </>
  );
}
