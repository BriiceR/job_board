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
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [companyMail, setCompanyMail] = useState(null);
  

  useEffect(() => {
    verifyCompany(cookies, navigate, removeCookie, toast, setCompanyId, setCompanyName, setCompanyMail);
  }, [cookies, navigate, removeCookie, setCompanyId, setCompanyName, setCompanyMail]);  

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

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/jobs/company/${companyId}`, {
        withCredentials: true,
      });
      setJobs(data.jobs);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/deleteJob/${jobId}`, { withCredentials: true });
      if (data.success) {
        toast.success("Annonce supprimée avec succès!", { theme: "dark" });
        fetchJobs();
      } else {
        toast.error("Erreur lors de la suppression de l'annonce");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce:", error);
      toast.error("Erreur lors de la suppression de l'annonce");
    }
  };

  const handleModify = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    setEditingJob(job._id); 
};

  
  const [editingJob, setEditingJob] = useState(null); 
  // const [saveAndEditCounter, setSaveAndEditCounter] = useState(0);

  const handleCancelEdit = () => {
    setEditingJob(null); 
    setJobData({ title: "", description: "" });
    
  };

  const handleSaveEdit = async (editingJob, JobData) => {
    console.log(editingJob); 
    // setSaveAndEditCounter(prevCounter => prevCounter + 1);
    // console.log(saveAndEditCounter);
    try {
      const { data } = await axios.put(`http://localhost:4000/jobs/${editingJob}`, JobData, { withCredentials: true });
      if (data.success) {
        toast.success("Annonce modifiée avec succès!", { theme: "dark" });
        fetchJobs();
        setEditingJob(null); 
        setJobData({ title: "", description: "" });
      } else {
        toast.error("Erreur lors de la modification de l'annonce");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce:", error);
      toast.error("Erreur lors de la modification de l'annonce");
    }
};

  

  useEffect(() => {
    if (companyId !== null ) {
      fetchJobs();
    }
  }, [companyId]);

  // Affichage conditionnel du formulaire de modification
  if (editingJob) {
    return (
      <div style={{ backgroundColor: "black", width: "100vw" }}>
        <HeaderCompanies OnClick={handleLogout} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "black", width: "96vw", border: "3px solid white", borderRadius: "1rem", marginBottom: "2rem", minHeight: "100vh" }}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem" }}>Modifier une Annonce</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid white" }}>
                <div>
                  <label htmlFor="title" style={{ color: "white", paddingLeft: "1rem", paddingRight: "1rem" }}>Titre :</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="description" style={{ color: "white", paddingLeft: "1rem", paddingRight: "1rem" }}>Description :</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={jobData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ paddingRight: "1rem" }}>
                <button onClick={() => handleSaveEdit(editingJob, jobData)} style={{ color: "black", marginLeft: "1rem", backgroundColor: "white", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Enregistrer les modifications</button>

                  <button onClick={handleCancelEdit} style={{ color: "black", marginLeft: "1rem", backgroundColor: "white", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Annuler</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "black",  width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", width: "96vw", border: "3px solid white", borderRadius: "1rem", marginBottom: "2rem", minHeight: "100vh"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Créer une Annonce</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid white" }}>
                <div>
                <label htmlFor="title" style={{ color: "white",  paddingLeft: "1rem", paddingRight: "1rem"  }}>Titre :</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="description" style={{ color: "white",  paddingLeft: "1rem", paddingRight: "1rem"  }}>Description :</label>
                <input
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  required
                />
                </div>
                <div style={{ paddingRight: "1rem"  }}>
                <button type="submit" style={{ color: "black", marginLeft: "1rem", backgroundColor: "white",  padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Créer l'annonce</button>
                </div>
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
                  <button onClick={() => handleModify(job._id)} style={{ color: "black", marginLeft: "1rem", backgroundColor: "white",  padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Modifier</button>


                    <button onClick={() => handleDelete(job._id)} style={{ color: "black", marginLeft: "1rem", backgroundColor: "white",  padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Supprimer</button>
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
