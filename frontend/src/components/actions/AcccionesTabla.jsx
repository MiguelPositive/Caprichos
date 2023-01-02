import React from "react";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Editar from "../buttons/Editar";

const AcccionesTabla = ({ funcionEliminar, funcionEditar }) => {
  return (
    <div
      className="botones"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="mr-4">
        <Editar
          accion={() => {
            funcionEditar();
          }}
        />
      </div>
      <div>
        <EliminarCerrar eliminar={true} accion={funcionEliminar} />
      </div>
    </div>
  );
};

export default AcccionesTabla;
