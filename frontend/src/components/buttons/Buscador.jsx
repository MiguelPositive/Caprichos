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
import { store } from "../context/ContextApp";
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
  const {
    searchUsers,
    searchRaws,
    searchProcessed,
    searchPizzas,
    searchSales,
  } = useContext(store);
  const [elemento, setElemento] = useState("");

  const handleChangeElemento = (e) => {
    setElemento(e.target.value);
  };

  const handleFiltrar = () => {
    switch (producto) {
      case "usuarios":
        setTimeout(() => {
          searchUsers(elemento);
        }, 200);

        break;
      case "crudos":
        setTimeout(() => {
          searchRaws(elemento);
        }, 200);
        break;

      case "procesados":
        setTimeout(() => {
          searchProcessed(elemento);
        }, 200);
        break;
      case "pizzas":
        setTimeout(() => {
          searchPizzas(elemento);
        }, 200);
        break;

      case "ventas":
        setTimeout(() => {
          searchSales(elemento);
        }, 200);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    handleFiltrar();
  }, [elemento]);

  return (
    <BarraBusqueda elevation={4} className="boton-buscador">
      <div
        style={{
          width: "93%",
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
