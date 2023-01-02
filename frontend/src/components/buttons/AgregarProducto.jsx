//react
import React from "react";
import { useState } from "react";

//materia react ui
import { Paper } from "@mui/material";

//icons
import { MdPostAdd } from "react-icons/md";

//styles
import "../../styles/Agregar.css";

const AgregarProducto = ({ titulo, accion }) => {
  const [elevacion, setElevacion] = useState(4);

  return (
    <>
      <Paper
        className="boton-agregar "
        elevation={elevacion}
        onMouseOver={() => {
          setElevacion(8);
        }}
        onMouseOut={() => {
          setElevacion(4);
        }}
        onClick={accion}
      >
        <div>
          <b>{titulo}</b>
        </div>

        <div>
          <MdPostAdd />
        </div>
      </Paper>
    </>
  );
};

export default AgregarProducto;
