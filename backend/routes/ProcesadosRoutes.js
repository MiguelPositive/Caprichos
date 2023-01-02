const express = require("express");
const {
  AgregarProcesado,
  ConsultarProcesados,
  EditarProcesado,
  EliminarProcesado,
} = require("../controllers/ProcesadosControlador.js");

const ProcesadosRouter = express.Router();

ProcesadosRouter.post("/agregar/procesado", AgregarProcesado);
ProcesadosRouter.get("/consultar/procesados", ConsultarProcesados);
ProcesadosRouter.post("/editar/procesado", EditarProcesado);
ProcesadosRouter.post("/eliminar/procesado", EliminarProcesado);

module.exports = { ProcesadosRouter };
