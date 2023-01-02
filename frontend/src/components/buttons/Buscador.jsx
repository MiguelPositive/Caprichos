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
    <Paper
      elevation={4}
      className="boton-buscador"
      sx={{ height: "3rem", padding: "0.5rem" }}
    >
      <TextField
        variant="standard"
        placeholder="Buscador"
        fullWidth
        onChange={handleChangeElemento}
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
    </Paper>
  );
};

export default Buscador;
