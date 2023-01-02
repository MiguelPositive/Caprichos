//react
import React from "react";

//react material ui
import { Button } from "@mui/material";

const AgregarIngredientes = ({ texto, accion }) => {
  return (
    <Button
      variant="contained"
      color="inherit"
      onClick={accion}
      sx={{ borderRadius: "2rem" }}
    >
      {texto}
    </Button>
  );
};

export default AgregarIngredientes;
