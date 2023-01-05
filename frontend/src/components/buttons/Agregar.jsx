//react
import React from "react";

//mui
import { Button } from "@mui/material";

const Agregar = ({ accion }) => {
  return (
    <Button onClick={accion} variant="outlined" sx={{ borderRadius: "3rem" }}>
      Añadir
    </Button>
  );
};

export default Agregar;
