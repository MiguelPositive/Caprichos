const { modeloUsuarios } = require("../models/UsuariosModelo.js");

const AgregarUsuario = async (req, res) => {
  try {
    const { usuario, contrasena, cargo } = req.body;
    const nuevoEmpleado = modeloUsuarios({ usuario, contrasena, cargo });

    nuevoEmpleado.save();
    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar el usaurio: ${error}`
    );
  }
};

//valida el usuario y contraseña para verificar que la persona tenga acceso
const ValidarUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    console.log();
    let temp = false;
    (await modeloUsuarios.find()).forEach((iterador) => {
      if (iterador.usuario === usuario && iterador.contrasena === contrasena) {
        temp = true;
      }
    });
    res.json({ mensaje: temp });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar validar el usuario`
    );
  }
};

const ValidarCargo = async (req, res) => {
  try {
    const { usuario } = req.body;
    let cargo = "";

    (await modeloUsuarios.find()).forEach((iterador) => {
      if (iterador.usuario == usuario) {
        cargo = iterador.cargo;
      }
    });

    res.json({ cargo: cargo });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar validar el cargo en el backend ${error}`
    );
  }
};
module.exports = {
  AgregarUsuario,
  ValidarUsuario,
  ValidarCargo,
};
