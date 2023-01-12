const mongoose = require("mongoose");

const ventasEsquema = mongoose.Schema({
  fecha: {
    type: String,
  },
  datosCliente: {
    type: Object,
  },

  datosTransaccion: {
    type: Object,
  },
  hora: {
    type: String,
  },

  esVenta: {
    type: Boolean,
  },
});

const modeloVentas = mongoose.model("ventas", ventasEsquema);

module.exports = {
  modeloVentas,
};
