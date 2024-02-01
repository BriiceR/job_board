import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import HeaderAdmin from "../components/HeaderAdmin";
import { verifyAdmin, logOut } from "../utils/utilsAuth";

export default function BordAdminComp() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        verifyAdmin(cookies, navigate, removeCookie, toast);
        console.log("User verified");
    }, [cookies, navigate, removeCookie, toast]);
  
    const handleLogout = () => {
      logOut(removeCookie, navigate);
  };

  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", width: "100vw"}}>
        <HeaderAdmin OnClick={handleLogout}/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ backgroundColor: "black", height: "20rem", width: "96vw", border: "3px solid white", borderRadius: "1rem"}}>
            <h1 style={{ color: "white", textAlign: "center", paddingTop: "1rem"}}>Liste des Entreprises</h1>
          </div>
        </div>
      </div>
    </>
  );
}
