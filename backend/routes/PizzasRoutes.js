const express = require("express");
const {
  createPizza,
  getPizzas,
  updatePizza,
  deletePizza,
} = require("../controllers/PizzasControlador.js");

const PizzasRouter = express.Router();

PizzasRouter.post("/create/pizza", createPizza);
PizzasRouter.get("/get/pizzas", getPizzas);
PizzasRouter.post("/update/pizza", updatePizza);
PizzasRouter.post("/delete/pizza", deletePizza);

module.exports = {
  PizzasRouter,
};
