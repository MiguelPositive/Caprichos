const express = require("express");
const {
  AgregarUsuario,
  ValidarUsuario,
  ValidarCargo,
  ConsultarUsuarios,
  EditarUsuario,
  EliminarUsuario,
} = require("../controllers/UsuariosControlador");

const UsuariosRouter = express.Router();

UsuariosRouter.post("/agregar/usuario", AgregarUsuario);
UsuariosRouter.post("/validar/usuario", ValidarUsuario);
UsuariosRouter.post("/validar/cargo", ValidarCargo);
UsuariosRouter.get("/consultar/usuarios", ConsultarUsuarios);
UsuariosRouter.post("/editar/usuario", EditarUsuario);
UsuariosRouter.post("/eliminar/usuario", EliminarUsuario);

module.exports = {
  UsuariosRouter,
};
