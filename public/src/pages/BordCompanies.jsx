import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderCompanies from "../components/HeaderCompanies";
import { verifyCompany, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordCompanies() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [companyMail, setCompanyMail] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    verifyCompany(cookies, navigate, removeCookie, toast, setCompanyId, setCompanyName, setCompanyMail);
    console.log("Company verified");
    fetchJobs(); // Charger les annonces une fois que la société est vérifiée
  }, [cookies, navigate, removeCookie, toast, setCompanyId, setCompanyName, setCompanyMail]);

  const handleLogout = () => {
    logOut(removeCookie, navigate);
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/jobs");
      if (response.data.success) {
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
      } else {
        toast.error("Erreur lors de la récupération des annonces");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      toast.error("Erreur lors de la récupération des annonces");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", width: "100vw"}}>
        <HeaderCompanies OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "100%", width: "96vw", border: "3px solid white", borderRadius: "1rem", padding: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Annonces</h1>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {jobs.map((job) => (
                <li key={job._id} style={{ display: "flex", justifyContent: "space-between",  padding: "1rem", borderBottom: "1px solid white"}}>
                  <div>
                    <h3 style={{ color: "white", margin: 0 }}>{job.title}</h3>
                    <p style={{ color: "white", margin: 0 }}>{job.description}</p>
                    <p style={{ color: "white", margin: 0 }}>Date : {new Date(job.createdAt).toLocaleDateString()}</p>
                    <p style={{ color: "white", margin: 0 }}>Entreprise : { job.company.name ? job.company.name : "Anonyme"}</p>
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
