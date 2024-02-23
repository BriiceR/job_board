import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderUsers from "../components/HeaderUsers";
import { verifyUser, logOut } from "../utils/utilsAuth";
import axios from "axios";

export default function BordUsersProfil() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [userMail, setUserMail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [diploma, setDiploma] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newDiploma, setNewDiploma] = useState("");

  useEffect(() => {
    verifyUser(cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail);
  }, [cookies, navigate, removeCookie, toast, setUserId, setFirstName, setLastName, setDiploma, setUserMail]);

  const handleLogout = () => {
    logOut(removeCookie, navigate);
  };

  const handleChangeFirstName = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setNewLastName(e.target.value);
  };

  const handleChangeDiploma = (e) => {
    setNewDiploma(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000//${userId}/updateUser`, {
        firstName: newFirstName,
        lastName: newLastName,
        diploma: newDiploma
      });

      if (response.data.success) {
        setFirstName(newFirstName);
        setLastName(newLastName);
        setDiploma(newDiploma);
        toast.success("Informations mises à jour avec succès!", { theme: "dark" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations de l'utilisateur :", error);
      toast.error("Erreur lors de la mise à jour des informations de l'utilisateur.");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "black", width: "100vw"}}>
        <HeaderUsers OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{ backgroundColor: "black", width: "96vw", border: "3px solid white", borderRadius: "1rem", marginBottom: "2rem", minHeight: "100vh" }}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Mon Profil</h1>
            <h3 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>{userMail}</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem" }}>
              <label htmlFor="newFirstName" style={{ color: "white", padding: "1rem" }}>Prénom :</label>
              <input
                type="text"
                id="newFirstName"
                value={newFirstName}
                placeholder={firstName}
                onChange={handleChangeFirstName}
                style={{ marginBottom: "1rem" }}
              />
              <label htmlFor="newLastName" style={{ color: "white", padding: "1rem" }}>Nom :</label>
              <input
                type="text"
                id="newLastName"
                value={newLastName}
                placeholder={lastName}
                onChange={handleChangeLastName}
                style={{ marginBottom: "1rem" }}
              />
              <label htmlFor="newDiploma" style={{ color: "white", padding: "1rem" }}>Diplôme :</label>
              <input
                type="text"
                id="newDiploma"
                value={newDiploma}
                placeholder={diploma}
                onChange={handleChangeDiploma}
                style={{ marginBottom: "1rem" }}
              />
              <button type="submit" style={{ color: "black", backgroundColor: "white", padding: "0.2rem 0.5rem", borderRadius: "0.2rem", border: "1px solid white" }}>Mettre à jour les informations</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
