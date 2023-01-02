//react
import React from "react";
import { useState } from "react";

//materia react ui
import { Paper } from "@mui/material";

//icons
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

//archivos externos
import "../../styles/Editar.css";

const Editar = ({ accion }) => {
  const [elevacion, setElevacion] = useState(5);

  return (
    <>
      <Paper
        className="boton-editar"
        elevation={elevacion}
        sx={{
          background: "#1B0181",
          color: "white",
          borderRadius: "1rem",
        }}
        onMouseOver={() => {
          setElevacion(8);
        }}
        onMouseOut={() => {
          setElevacion(5);
        }}
        onClick={accion}
      >
        <h2>
          <ModeEditRoundedIcon />
        </h2>
      </Paper>
    </>
  );
};

export default Editar;
