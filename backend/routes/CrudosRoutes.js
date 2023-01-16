const express = require("express");
const {
  createRaw,
  getRaws,
  updateRaw,
  deleteRaw,
} = require("../controllers/CrudosControlador.js");

const CrudosRouter = express.Router();

CrudosRouter.post("/create/raw", createRaw);
CrudosRouter.get("/get/raws", getRaws);
CrudosRouter.post("/update/raw", updateRaw);
CrudosRouter.post("/delete/raw", deleteRaw);

module.exports = {
  CrudosRouter,
};
