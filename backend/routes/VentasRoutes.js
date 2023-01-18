const express = require("express");
const {
  createSale,
  getSales,
  updateSale,
  deleteSale,
  confirmSale,
} = require("../controllers/VentasControlador.js");

const VentasRouter = express.Router();

VentasRouter.post("/create/sale", createSale);
VentasRouter.get("/get/sales", getSales);
VentasRouter.post("/update/sale", updateSale);
VentasRouter.post("/delete/sale", deleteSale);
VentasRouter.post("/confirm/sale", confirmSale);

module.exports = {
  VentasRouter,
};
