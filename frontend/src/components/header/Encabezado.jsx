//react
import React from "react";
import { useContext } from "react";

//react router doom
import { NavLink } from "react-router-dom";

//material react ui
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { amber } from "@mui/material/colors";

//icons
import ViewHeadlineRoundedIcon from "@mui/icons-material/ViewHeadlineRounded";

//archivos externos
import { store } from "../context/ContextApp";
import "animate.css";

const MenuPerzonalizado = styled(Toolbar)({
  backgroundColor: "#1E1E1E",
  display: "flex",
  justifyContent: "space-between",
});

const TextoOpciones = styled(Typography)({
  color: "white",
  textDecoration: "none",
  textDecorationLine: "none",
  fontWeight: "bold",
});

const BotonLogout = styled(Button)({
  background: "#FFC300",
  fontWeight: "bold",
  color: "black",
  borderRadius: "3rem",
  transition: "0.5s",

  "&:hover": {
    transition: "0.5s",
    background: "#DDB135",
    transform: "translateX(-2rem)",
  },
});

const Encabezado = () => {
  const { cookies, EliminarCookie, handleOpenMenu } = useContext(store);

  let cargo = cookies.get("cargo");

  return (
    <div className="animate__animated animate__fadeIn">
      <AppBar position="static">
        <MenuPerzonalizado>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "",
            }}
          >
            {cargo == "admin" || cargo == "visitante" ? (
              <div>
                <IconButton onClick={handleOpenMenu}>
                  <TextoOpciones>
                    <ViewHeadlineRoundedIcon />
                  </TextoOpciones>
                </IconButton>
              </div>
            ) : (
              <div> </div>
            )}

            <div>
              <TextoOpciones>{cookies.get("usuario")}</TextoOpciones>
            </div>
          </div>

          <div>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <BotonLogout variant="contained" onClick={EliminarCookie}>
                CERRAR SESIÓN
              </BotonLogout>
            </NavLink>
          </div>
        </MenuPerzonalizado>
      </AppBar>
    </div>
  );
};

export default Encabezado;
