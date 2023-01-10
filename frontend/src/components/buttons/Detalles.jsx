//react
import React from "react";

//mui
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import { padding } from "@mui/system";

//externos

//estilisados

const BotonDetalles = styled(Paper)({
  borderRadius: "3rem",
  width: "5rem",
  height: "2rem",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
});

const Detalles = ({ accion }) => {
  return <BotonDetalles onClick={accion}> Detalles</BotonDetalles>;
};

export default Detalles;
