const express = require("express");
const {
  AgregarVenta,
  ConsultarVentas,
} = require("../controllers/VentasControlador.js");

const VentasRouter = express.Router();

VentasRouter.post("/agregar/venta", AgregarVenta);
VentasRouter.get("/consultar/ventas", ConsultarVentas);

module.exports = {
  VentasRouter,
};
