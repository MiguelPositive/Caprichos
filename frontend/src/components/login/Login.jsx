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

//icons
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

//archivos externos
import { NombreContexto } from "../context/ContextApp";
import "animate.css";
import "../../styles/Login.css";

const BotonLogin = styled(Button)({
  borderRadius: 300,
});

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showcontrasena, setShowContrasena] = useState(false);
  const navigate = useNavigate();

  const { cookies, CrearCookie, HacerValidacionUsuario, HacerValidacionCargo } =
    useContext(NombreContexto);

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangeContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(`usuario: ${usuario} contraseña: ${contrasena}`);

    if ((await HacerValidacionUsuario(usuario, contrasena)) == true) {
      let cargo = await HacerValidacionCargo(usuario);

      CrearCookie(true, usuario, cargo);
      console.log(`cookie de logueo: ${cookies.get("logeado")}`);
      console.log(`cookie de usuario: ${cookies.get("usuario")}`);
      console.log(`cookie de cargo: ${cookies.get("cargo")}`);

      if (cookies.get("cargo") == "cajero") {
        navigate("/caja");
      } else if (cookies.get("cargo") == "admin") {
        window.location = "http://192.168.18.222:5173/inicio";
      }
    } else if ((await HacerValidacionUsuario(usuario, contrasena)) == false) {
      alert("el usuario no existe");
    } else {
      alert(
        `usuario: ${cookies.get("usuario")} cargo: ${cookies.get("cargo")}`
      );
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
          display: "grid",
          borderRadius: "1rem",
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto",
          rowGap: "14%",
          textAlign: "center",
          width: "18rem",
          padding: "2rem 3rem 6rem 3rem",
          background: "white",
        }}
      >
        <h5 style={{ color: "gray" }}>
          <b>INICIO DE SESIÓN</b>
        </h5>
        <TextField
          placeholder="usuario"
          type="text"
          variant="standard"
          onChange={handleChangeUsuario}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type={showcontrasena ? "text" : "password"}
          placeholder="*******"
          variant="standard"
          onChange={handleChangeContrasena}
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

        <BotonLogin
          className="boton-login"
          color="success"
          variant="contained"
          endIcon={<AccessibilityNewIcon />}
          sx={{
            marginTop: "0.5rem",
            transition: "0.3s",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(62,30,35,1) 58%, rgba(255,0,0,1) 100%)",
          }}
          onClick={handleSubmit}
        >
          <b>INGRESAR</b>
        </BotonLogin>
      </Paper>
    </div>
  );
};

export default Login;
