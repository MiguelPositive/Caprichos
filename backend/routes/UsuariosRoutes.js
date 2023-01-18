const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  validateUser,
  validatePosition,
} = require("../controllers/UsuariosControlador");

const UsuariosRouter = express.Router();

UsuariosRouter.post("/create/user", createUser);
UsuariosRouter.get("/get/users", getUsers);
UsuariosRouter.post("/update/user", updateUser);
UsuariosRouter.post("/delete/user", deleteUser);
UsuariosRouter.post("/validate/user", validateUser);
UsuariosRouter.post("/validate/position", validatePosition);

module.exports = {
  UsuariosRouter,
};
