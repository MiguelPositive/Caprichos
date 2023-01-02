const mongoose = require("mongoose");

const usuariosEsquema = mongoose.Schema({
  usuario: {
    type: String,
    trim: false,
  },

  contrasena: {
    type: String,
    trim: false,
  },

  cargo: {
    type: String,
    trim: false,
  },
});

const modeloUsuarios = mongoose.model("usuarios", usuariosEsquema);

module.exports = { modeloUsuarios };
