const express = require("express");
const {
  AgregarPizza,
  ConsultarPizzas,
  EditarPizza,
  EliminarPizza,
} = require("../controllers/PizzasControlador.js");

const PizzasRouter = express.Router();

PizzasRouter.post("/agregar/pizza", AgregarPizza);
PizzasRouter.get("/consultar/pizzas", ConsultarPizzas);
PizzasRouter.post("/eliminar/pizza", EliminarPizza);
PizzasRouter.post("/editar/pizza", EditarPizza);

module.exports = {
  PizzasRouter,
};
