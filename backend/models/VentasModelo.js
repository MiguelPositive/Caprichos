const mongoose = require("mongoose");

const ventasEsquema = mongoose.Schema({
  fecha: {
    type: String,
  },
  datosCliente: {
    type: Array,
  },

  datosTransaccion: {
    type: Array,
  },
});

const modeloVentas = mongoose.model("ventas", ventasEsquema);

module.exports = {
  modeloVentas,
};
