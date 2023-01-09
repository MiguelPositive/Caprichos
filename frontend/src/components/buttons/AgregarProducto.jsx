//react
import React from "react";
import { useState } from "react";

//materia react ui
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

//iconos
import { MdPostAdd } from "react-icons/md";

//externos
import "../../styles/Agregar.css";

const BotonAgregarProducto = styled(Paper)({
  transition: "0.5s",
  borderRadius: "20rem",
  width: "10rem",
  height: "2.5rem",
  padding: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    transition: "0.5s",
    transform: "translateX(5%)",
  },
});

const AgregarProducto = ({ titulo, accion }) => {
  const [elevacion, setElevacion] = useState(4);

  return (
    <>
      <BotonAgregarProducto
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
      </BotonAgregarProducto>
    </>
  );
};

export default AgregarProducto;
