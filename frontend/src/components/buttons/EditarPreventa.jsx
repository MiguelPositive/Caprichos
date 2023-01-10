//react
import React from "react";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

const BotonEditarPreventa = styled(Paper)({
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

const EditarPreventa = ({ accion }) => {
  return <BotonEditarPreventa> Editar Preventa</BotonEditarPreventa>;
};

export default EditarPreventa;
