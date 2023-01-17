const express = require("express");
const {
  createProcessed,
  getProcessed,
  updateProcessed,
  deleteProcessed,
} = require("../controllers/ProcesadosControlador.js");

const ProcesadosRouter = express.Router();

ProcesadosRouter.post("/create/processed", createProcessed);
ProcesadosRouter.get("/get/processed", getProcessed);
ProcesadosRouter.post("/update/processed", updateProcessed);
ProcesadosRouter.post("/delete/processed", deleteProcessed);

module.exports = { ProcesadosRouter };
