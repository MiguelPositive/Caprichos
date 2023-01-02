//react
import React from "react";
import { useState } from "react";

//materia react ui
import { Paper } from "@mui/material";

//icons
import { MdDelete } from "react-icons/md";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

//archivos externos
import "../../styles/EliminarCerrar.css";

const EliminarCerrar = ({ eliminar, accion }) => {
  const [elevacion, setElevacion] = useState(5);

  return (
    <>
      <Paper
        className={eliminar ? "boton-eliminar" : "boton-cerrar"}
        elevation={elevacion}
        sx={{
          background: "#CE2A19",
          color: "white",
          borderRadius: "1rem",
        }}
        onClick={accion}
        onMouseOver={() => {
          setElevacion(8);
        }}
        onMouseOut={() => {
          setElevacion(5);
        }}
      >
        <div>
          <h2>
            {eliminar ? (
              <div>
                <h5>
                  <MdDelete />
                </h5>
              </div>
            ) : (
              <CloseRoundedIcon />
            )}
          </h2>
        </div>
      </Paper>
    </>
  );
};

export default EliminarCerrar;
