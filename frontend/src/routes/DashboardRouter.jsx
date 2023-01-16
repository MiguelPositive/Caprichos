import React from "react";
import { Route, Routes } from "react-router-dom";

import Inicio from "../components/views/Inicio";
import Encabezado from "../components/header/Encabezado";
import EncabezadoCajero from "../components/header/EncabezadoCajero";
import Caja from "../components/views/Caja";
import Pizzas from "../components/views/Pizzas";
import Crudos from "../components/views/Crudos";
import Procesados from "../components/views/Procesados";
import Usuarios from "../components/views/Usuarios";
import { useContext } from "react";
import { store } from "../components/context/ContextApp";
import Lista from "../components/header/Lista";

const DashboardRouter = () => {
  const { cookies } = useContext(store);

  let cargo = cookies.get("cargo");

  if (cargo == "cajero") {
    return (
      <>
        <div>
          <EncabezadoCajero />
          <Routes>
            <Route path="/caja" element={<Caja />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </div>
      </>
    );
  } else if ((cargo = "admin")) {
    return (
      <>
        <div>
          <Encabezado />
          <Lista />

          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/caja" element={<Caja />} />
            <Route path="/pizzas" element={<Pizzas />} />
            <Route path="/crudos" element={<Crudos />} />
            <Route path="/procesados" element={<Procesados />} />
            <Route path="/usuarios" element={<Usuarios />} />

            <Route path="*" element={<Inicio />} />
          </Routes>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <Encabezado />
        <Lista />
        <Routes>
          <Route path="*" element={<h1>Permiso de usuario no admitido</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardRouter;
