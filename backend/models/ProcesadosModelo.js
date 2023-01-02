const mongoose = require("mongoose");

const ProcesadosEsquema = mongoose.Schema({
  nombre: {
    type: String,
    trim: false,
  },

  cantidad: {
    type: Number,
    trim: true,
  },

  ingredientes: {
    type: Array,
  },
});

const modeloProcesados = mongoose.model("procesados", ProcesadosEsquema);

module.exports = { modeloProcesados };
