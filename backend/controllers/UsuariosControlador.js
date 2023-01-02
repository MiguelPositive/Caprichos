const { modeloUsuarios } = require("../models/UsuariosModelo.js");

const AgregarUsuario = async (req, res) => {
  try {
    const { usuario, contrasena, cargo } = req.body;
    const nuevoEmpleado = modeloUsuarios({ usuario, contrasena, cargo });

    nuevoEmpleado.save();
    res.json({ mensaje: "usuario agregado" });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar agregar el usaurio en el backend: ${error}`
    );
  }
};

const ValidarUsuario = async (req, res) => {
  const { usuario, contrasena } = req.body;

  console.log(`usuario: ${usuario} contraseña: ${contrasena}`);

  const usuarioValidado = (await modeloUsuarios.find()).map(
    (iterador) =>
      iterador.usuario == usuario && iterador.contrasena == contrasena
  );
  res.send(...usuarioValidado);
};

const ValidarCargo = async (req, res) => {
  console.log("usuario para validar dentro del controlador Validar Cargo");
  console.log(await req.body.usuario);

  console.log("cuerpo solicitudad");
  console.log(req.body);

  try {
    const validacionCargo = await modeloUsuarios.find({
      usuario: req.body.usuario,
    });

    // console.log("cargo validado");
    console.log(validacionCargo[0].cargo);
    let Cargo = validacionCargo[0].cargo;

    console.log(`Cargo : ${Cargo}`);
    res.send(Cargo);
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
