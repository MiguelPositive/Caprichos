//react
import React from "react";

//mui
import { Box } from "@mui/material";

//iconos

//externos
import AgregarProducto from "../buttons/AgregarProducto";
import Buscador from "../buttons/Buscador";

const Usuarios = () => {
  return (
    <div style={{ width: "100%", height: "100%" }} className="container">
      <div className="row mt-4">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <AgregarProducto titulo={"Agregar Usuario"} />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <Buscador producto={"usuarios"} />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
