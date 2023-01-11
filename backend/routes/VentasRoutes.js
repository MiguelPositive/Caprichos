const express = require("express");
const {
  AgregarVenta,
  ConsultarVentas,
  EditarPreventa,
  EliminarPreventa,
} = require("../controllers/VentasControlador.js");

const VentasRouter = express.Router();

VentasRouter.post("/agregar/venta", AgregarVenta);
VentasRouter.get("/consultar/ventas", ConsultarVentas);
VentasRouter.post("/editar/preventa", EditarPreventa);
VentasRouter.post("/eliminar/preventa", EliminarPreventa);

module.exports = {
  VentasRouter,
};
