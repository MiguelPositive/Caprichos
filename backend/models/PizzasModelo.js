const mongoose = require("mongoose");

const pizzasSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  ingredients: {
    type: Array,
  },

  productionCost: {
    type: Number,
    trim: false,
  },

  saleValue: {
    type: Number,
    trim: false,
  },
});

const pizzasModel = mongoose.model("pizzas", pizzasSchema);

module.exports = {
  pizzasModel,
};
