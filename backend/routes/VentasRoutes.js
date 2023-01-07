const express = require("express");
const { AgregarVenta } = require("../controllers/VentasControlador.js");

const VentasRouter = express.Router();

VentasRouter.post("/agregar/venta", AgregarVenta);

module.exports = {
  VentasRouter,
};
