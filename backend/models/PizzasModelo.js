const mongoose = require("mongoose");

const pizzasSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  cost: {
    type: Number,
    trim: false,
  },

  ingredients: {
    type: Array,
  },
});

const pizzasModel = mongoose.model("pizzas", pizzasSchema);

module.exports = {
  pizzasModel,
};
