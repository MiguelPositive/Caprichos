const mongoose = require("mongoose");

const rawsSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  totalWeight: {
    type: Number,
    trim: true,
  },

  portionWeight: {
    type: Number,
    trim: true,
  },

  portionsQuantity: {
    type: Number,
    trim: true,
  },
});

const rawsModel = mongoose.model("crudos", rawsSchema);

module.exports = { rawsModel };
