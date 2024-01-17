import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function LoginUsers() {
  const [cookies, setCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/loginUsers",
        { ...values },
        { withCredentials: true }
      );

      if (data) {
        
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          // Authentification réussie, stocker le token
          setCookie("jwt", data.token, { path: "/", httpOnly: true });
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <button type="submit">Connexion</button>
        <span>
          Pas de compte ?<Link to="/register"> S'enregistrer </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginUsers;
