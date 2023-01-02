const mongoose = require("mongoose");

const CrudosEsquema = mongoose.Schema({
  nombre: {
    type: String,
    trim: false,
  },

  peso: {
    type: Number,
    trim: true,
  },

  gramosPorcion: {
    type: Number,
    trim: true,
  },

  cantidadPorciones: {
    type: Number,
    trim: true,
  },
});

const modeloCrudos = mongoose.model("crudos", CrudosEsquema);

module.exports = { modeloCrudos };
