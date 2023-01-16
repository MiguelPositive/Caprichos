const { modeloUsuarios } = require("../models/UsuariosModelo.js");

const ConsultarUsuarios = async (req, res) => {
  try {
    const usuarios = await modeloUsuarios.find().lean().exec();

    res.send({ usuarios });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los datos: ${error}`
    );
  }
};

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

const EditarUsuario = async (req, res) => {
  try {
    const { _id, usuario, contrasena, cargo } = req.body;
    await modeloUsuarios.updateOne(
      { _id },
      { $set: { usuario, contrasena, cargo } }
    );

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el usuario: ${error}`
    );
  }
};

const EliminarUsuario = async (req, res) => {
  try {
    const { _id } = req.body;

    await modeloUsuarios.deleteOne({ _id });

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el usuario: ${error}`
    );
  }
};

module.exports = {
  AgregarUsuario,
  ValidarUsuario,
  ValidarCargo,
  ConsultarUsuarios,
  EditarUsuario,
  EliminarUsuario,
};
