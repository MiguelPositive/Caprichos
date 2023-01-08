const mongoose = require("mongoose");

const ventasEsquema = mongoose.Schema({
  fecha: {
    type: String,
  },
  datos: {
    type: Array,
  },
});

const modeloVentas = mongoose.model("ventas", ventasEsquema);

module.exports = {
  modeloVentas,
};
