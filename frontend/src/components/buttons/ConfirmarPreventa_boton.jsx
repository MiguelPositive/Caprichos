//react
import React from "react";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

const BotonConfirmarPreventa = styled(Paper)({
  borderRadius: "3rem",
  height: "2.5rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontWeight: "bold",
  cursor: "pointer",
});

const ConfirmarPreventa_boton = ({ accion }) => {
  return (
    <BotonConfirmarPreventa onClick={accion}>
      Confirmar Preventa
    </BotonConfirmarPreventa>
  );
};

export default ConfirmarPreventa_boton;
