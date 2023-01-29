const mongoose = require("mongoose");

const processedSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  quantity: {
    type: Number,
    trim: true,
  },

  ingredients: {
    type: Array,
  },

  portionCost: {
    type: "Number",
    trim: true,
  },
});

const processedModel = mongoose.model("procesados", processedSchema);

module.exports = { processedModel };
