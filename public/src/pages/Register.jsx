import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ContainerUser, DivForm, InputForm, TitleForm, UserButton, Form } from "../utils/utils";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "", confirmPassword: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification si les mots de passe correspondent
    if (values.password !== values.confirmPassword) {
      generateError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <ContainerUser>
    <TitleForm>S'inscrire</TitleForm>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <DivForm>
          <label htmlFor="email">Email</label>
          <InputForm
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </DivForm>
        <DivForm>
          <label htmlFor="password">Mot de passe</label>
          <InputForm
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </DivForm>
        <DivForm>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <InputForm
            type="password"
            placeholder="Mot de passe"
            name="confirmPassword"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </DivForm>
        <UserButton type="submit">S'inscrire</UserButton>
        <span>
          Déjà un compte ?<Link style={{ textDecoration: "none", color: "#5062ff"}} to="/loginUsers"> Se connecter</Link>
        </span>
      </Form>
      <ToastContainer />
    </ContainerUser>
  );
}

export default Register;
