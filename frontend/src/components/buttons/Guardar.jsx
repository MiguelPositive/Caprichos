//react
import React from "react";
import { useState } from "react";

//materia react ui
import { Paper } from "@mui/material";

//icons
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

//archivos externos
import "../../styles/Guardar.css";

const Guardar = ({ accion }) => {
  const [elevacion, setElevacion] = useState(5);

  return (
    <>
      <Paper
        className="boton-guardar"
        elevation={elevacion}
        sx={{
          background: "#5FB93C",
          color: "white",
          borderRadius: "1rem",
        }}
        onClick={accion}
        onMouseOver={() => {
          setElevacion(8);
        }}
        onMouseOut={() => {
          setElevacion(5);
        }}
      >
        <h2>
          <CheckRoundedIcon />
        </h2>
      </Paper>
    </>
  );
};

export default Guardar;
