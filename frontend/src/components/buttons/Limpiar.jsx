//react
import React from "react";

//mui
import { Button } from "@mui/material";

const Limpiar = ({ accion }) => {
  return (
    <Button variant="contained" onClick={accion} sx={{ borderRadius: "3rem" }}>
      Limpiar
    </Button>
  );
};

export default Limpiar;
