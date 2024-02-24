import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderUsers from "../components/HeaderUsers";
import { verifyUser, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordUsers() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [jobs, setJobs] = useState([]);
  const [userMail, setUserMail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [diploma, setDiploma] = useState(null);
  const [candidatureStatus, setCandidatureStatus] = useState(null);

    useEffect(() => {
      verifyUser(cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail );
        console.log("User verified");
        fetchJobs();    
    }, [cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail ]);
  
    const handleLogout = () => {
      logOut(removeCookie, navigate);
  };
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/jobs");
      if (response.data.success) {
        setJobs(response.data.jobs);
        // console.log(response.data.jobs);
      } else {
        toast.error("Erreur lors de la récupération des annonces");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      toast.error("Erreur lors de la récupération des annonces");
    }
  };

  const handleApply = async (jobId, userId) => {
    try {
      // Envoyer une requête POST pour créer une candidature
      const response = await axios.post(`http://localhost:4000/candidatures`, {
        jobId: jobId,
        userId: userId
      });
  
      if (response.data.success) {
        // Récupérer l'ID de la candidature créée
        const candidatureId = response.data.id;
        console.log(response.data);
        // Envoyer une requête PUT pour mettre à jour l'emploi avec l'ID de la candidature
        const updatedJobResponse = await axios.put(`http://localhost:4000/jobs/${jobId}/updateWithCandidature/${candidatureId}`);

        if (updatedJobResponse.data.success) {
          // Mettre à jour le statut directement
          const updatedJobs = jobs.map(job => {
            if (job._id === jobId) {
              return { ...job, status: response.data.status };
            }
            return job;
          });
          setJobs(updatedJobs);
          toast.success("Candidature envoyée avec succès!");
        } else {
          toast.error("Erreur lors de l'envoi de la candidature");
        }
      } else {
        toast.error("Erreur lors de l'envoi de la candidature");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la candidature:", error);
      toast.error("Erreur lors de l'envoi de la candidature");
    }
  };
  
  

  const fetchCandidature = async (jobId, userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/candidatures/${jobId}/${userId}/status`);
      if (response.data.success) {
        // console.log(response.data.status);
        return response.data.status;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la candidature:", error);
      return null;
    }
  };

  useEffect(() => {
    if (userId) {
      jobs.forEach(async (job) => {
        const status = await fetchCandidature(job._id, userId);
        setCandidatureStatus((prevStatus) => ({
          ...prevStatus,
          [job._id]: status
        }));
      });
    }
  }, [userId, jobs]);


  return (
    <>
      <div style={{ backgroundColor: "black", width: "100vw"}}>
        <HeaderUsers OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "100%", width: "96vw", border: "3px solid white", borderRadius: "1rem", padding: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Annonces</h1>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((job) => (
                <li key={job._id} style={{ display: "flex", justifyContent: "space-between",  padding: "1rem", borderBottom: "1px solid white"}}>
                  <div>
                    <h3 style={{ color: "white", margin: 0 }}>{job.title}</h3>
                    <p style={{ color: "white", margin: 0 }}>{job.description}</p>
                    <p style={{ color: "white", margin: 0 }}>Date : {new Date(job.createdAt).toLocaleDateString()}</p>
                    <p style={{ color: "white", margin: 0 }}>Entreprise : { job.company.name ? job.company.name : "Anonyme"}</p>
                  </div>
                  <div style={{ paddingRight: "1rem"  }}>
                  <button disabled={candidatureStatus && candidatureStatus[job._id]} onClick={() => handleApply(job._id, userId)}  style={{ color: "black", marginLeft: "1rem", backgroundColor: "white",  padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white", cursor: "pointer" }}>Postuler</button>
                  <p style={{ 
                    color: candidatureStatus ? 
                    (candidatureStatus[job._id] === 'pending' ? "blue" : 
                    (candidatureStatus[job._id] === 'accepted' ? "green" : 
                    (candidatureStatus[job._id] === 'rejected' ? "red" : "white"))) 
                    : "white", 
                    marginLeft: "1rem", 
                    marginTop: "1rem"
                  }}>
                    {candidatureStatus && candidatureStatus[job._id]}
                    </p>
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
