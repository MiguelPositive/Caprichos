//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//reat material ui
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

//iconos
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

//archivos externos
import { NombreContexto } from "../context/ContextApp";
import "../../styles/Buscador.css";
import styled from "@emotion/styled";

const BarraBusqueda = styled(Paper)({
  borderRadius: "20rem",
  height: "2.7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Buscador = ({ producto }) => {
  const { BuscarCrudos, ConsultarCrudos, BuscarProcesados, BuscarPizzas } =
    useContext(NombreContexto);
  const [elemento, setElemento] = useState("");

  const handleChangeElemento = (e) => {
    setElemento(e.target.value);
  };

  const handleFiltrar = () => {
    if (producto == "crudos") {
      setTimeout(() => {
        BuscarCrudos(elemento);
      }, 200);
    } else if (producto == "procesados") {
      setTimeout(() => {
        BuscarProcesados(elemento);
      }, 200);
    } else if (producto == "pizzas") {
      setTimeout(() => {
        BuscarPizzas(elemento);
      }, 200);
    }
  };

  useEffect(() => {
    handleFiltrar();
  }, [elemento]);

  return (
    <BarraBusqueda elevation={4} className="boton-buscador">
      <div
        style={{
          width: "95%",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Buscador"
          onChange={handleChangeElemento}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: "1.2rem",
          }}
        />
      </div>
    </BarraBusqueda>
  );
};

export default Buscador;
