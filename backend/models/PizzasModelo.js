const mongoose = require("mongoose");

const PizzasEsquema = mongoose.Schema({
  nombre: {
    type: String,
    trim: false,
  },

  precio: {
    type: Number,
    trim: false,
  },

  ingredientes: {
    type: Array,
  },
});

const modeloPizzas = mongoose.model("pizzas", PizzasEsquema);

module.exports = {
  modeloPizzas,
};