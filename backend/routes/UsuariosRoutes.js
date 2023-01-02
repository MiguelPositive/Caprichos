const express = require("express");
const {
  AgregarUsuario,
  ValidarUsuario,
  ValidarCargo,
} = require("../controllers/UsuariosControlador");

const UsuariosRouter = express.Router();

UsuariosRouter.post("/agregar/usuario", AgregarUsuario);
UsuariosRouter.post("/validar/usuario", ValidarUsuario);
UsuariosRouter.post("/validar/cargo", ValidarCargo);

module.exports = {
  UsuariosRouter,
};
