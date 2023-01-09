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
});

const modeloVentas = mongoose.model("ventas", ventasEsquema);

module.exports = {
  modeloVentas,
};
