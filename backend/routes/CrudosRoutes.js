const express = require("express");
const {
  AgregarCrudo,
  ConsultarCrudos,
  EditarCrudo,
  EliminarCrudo,
  BuscarCrudos,
} = require("../controllers/CrudosControlador.js");

const CrudosRouter = express.Router();

CrudosRouter.post("/agregar/crudo", AgregarCrudo);
CrudosRouter.get("/consultar/crudos", ConsultarCrudos);
CrudosRouter.post("/editar/crudo", EditarCrudo);
CrudosRouter.post("/eliminar/crudo", EliminarCrudo);
CrudosRouter.post("/buscar/crudos", BuscarCrudos);

module.exports = {
  CrudosRouter,
};
