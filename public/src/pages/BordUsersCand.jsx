import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderUsers from "../components/HeaderUsers";
import { verifyUser, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordUsersCand() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [jobs, setJobs] = useState([]);
  const [userMail, setUserMail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [diploma, setDiploma] = useState(null);
  const [candidatureStatus, setCandidatureStatus] = useState(null);
  const [userCandidatures, setUserCandidatures] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  console.log(jobDetails);

    useEffect(() => {
      verifyUser(cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail );
        console.log("User verified");   
    }, [cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail ]);
  
    const handleLogout = () => {
      logOut(removeCookie, navigate);
  };

  const fetchUserCandidatures = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/candidatures/user/${userId}`
      );
      if (response.data.success) {
        setUserCandidatures(response.data.candidatures);
      } else {
        toast.error("Erreur lors de la récupération des candidatures de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures de l'utilisateur :", error);
      toast.error("Erreur lors de la récupération des candidatures de l'utilisateur");
    }
  };

  const fetchJobDetails = async () => {
    try {
      const jobIds = userCandidatures.map((candidature) => candidature.job);
      const promises = jobIds.map((jobId) =>
        axios.get(`http://localhost:4000/jobs/${jobId}`)
      );
      const responses = await Promise.all(promises);
      const jobDetailsMap = {};
      responses.forEach((response, index) => {
        const jobId = jobIds[index];
        jobDetailsMap[jobId] = response.data.job;
      });
      setJobDetails(jobDetailsMap);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'emploi :", error);
      toast.error("Erreur lors de la récupération des détails de l'emploi");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserCandidatures(userId);
    }
  }, [userId]);

  useEffect(() => {
    fetchJobDetails();
  }, [userCandidatures]);


  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", width: "100vw" }}>
        <HeaderUsers OnClick={handleLogout} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "black", height: "20rem", width: "96vw", border: "3px solid white", borderRadius: "1rem" }}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem" }}>Mes Candidatures</h1>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {userCandidatures.map((candidature) => (
                <li key={candidature._id} style={{ color: "white", padding: "0.5rem 1rem", borderBottom: "1px solid white" }}>
                  {/* Afficher les détails de la candidature ici */}
                  {/* Par exemple : */}
                  <p>Candidature pour {jobDetails[candidature.job]?.title} </p>
                  <p>État: {candidature.status} </p>
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
