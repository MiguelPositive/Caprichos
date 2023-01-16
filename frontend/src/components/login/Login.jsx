//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";

//react router dom
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

//material react ui
import styled from "@emotion/styled";
import { InputAdornment } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";

//iconos
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

//archivos externos
import { store } from "../context/ContextApp";
import "animate.css";
import "../../styles/Login.css";

const BotonLogin = styled(Paper)({
  transition: "0.4s",
  borderRadius: "20rem",
  background: "black",
  cursor: "pointer",
  height: "2.5rem",
  padding: "0.2rem",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    transition: "0.4s",
    transform: "translateY(-15%)",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(62,30,35,1) 58%, rgba(255,0,0,1) 100%)",
    "&:before": {
      background: "black",
    },
  },
});

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showcontrasena, setShowContrasena] = useState(false);
  const navigate = useNavigate();

  const { cookies, CrearCookie, HacerValidacionUsuario, HacerValidacionCargo } =
    useContext(store);

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangeContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async () => {
    let verificador = await HacerValidacionUsuario(usuario, contrasena);

    if (verificador) {
      let cargo = await HacerValidacionCargo(usuario);

      CrearCookie(true, usuario, cargo);

      if (cookies.get("cargo") == "cajero") {
        navigate("/caja");
      } else if (cookies.get("cargo") == "admin" || cookies.get("visitante")) {
        navigate("/inicio");
      }
    } else {
      alert("el usuario o contraseña invalido");
    }
  };

  const handleShowContrasena = () => {
    setShowContrasena(!showcontrasena);
  };

  return (
    <div className="contenedor-login animate__animated animate__fadeIn">
      <Paper
        className="login"
        elevation={7}
        sx={{
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "center",
          width: "21rem",
          padding: "3rem 4rem 3rem 4rem",
        }}
      >
        <div style={{ width: "100%" }}>
          <h5 style={{ color: "gray" }}>
            <b>INICIO DE SESIÓN</b>
          </h5>
        </div>

        <div className="mt-2" style={{ width: "100%" }}>
          <TextField
            placeholder="usuario"
            type="text"
            variant="standard"
            onChange={handleChangeUsuario}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mt-4" style={{ width: "100%" }}>
          <TextField
            type={showcontrasena ? "text" : "password"}
            placeholder="*******"
            variant="standard"
            onChange={handleChangeContrasena}
            fullWidth
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleShowContrasena}
                  >
                    {showcontrasena ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mt-4" style={{ width: "100%" }}>
          <BotonLogin onClick={handleSubmit}>
            <b className="mr-1">INGRESAR</b>
            <AccessibilityNewIcon />
          </BotonLogin>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
