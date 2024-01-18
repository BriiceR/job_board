import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { CompanyButton, ContainerCompanies, DivForm, TitleForm, Form, InputForm } from "../utils/utils";

function LoginCompanies() {
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
    <ContainerCompanies>
      <TitleForm>Connexion</TitleForm>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <DivForm>
          <label htmlFor="email">Email</label>
          <InputForm
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </DivForm>
        <DivForm>
          <label htmlFor="password">Mot de passe</label>
          <InputForm
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </DivForm>
        <CompanyButton style={{backgroundColor: "#F24242"}} type="submit">Connexion</CompanyButton>
        <span>
          Pas de compte ?<Link style={{textDecoration: "none", color: "#F24242"}} to="/registerCompanies"> S'enregistrer </Link>
        </span>
      </Form>
      <ToastContainer />
    </ContainerCompanies>
  );
}

export default LoginCompanies;
