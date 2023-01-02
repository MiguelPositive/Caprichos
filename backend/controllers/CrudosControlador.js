const { modeloCrudos } = require("../models/CrudosModelo.js");

const AgregarCrudo = async (req, res) => {
  try {
    let { nombre, peso, gramosPorcion, cantidadPorciones } = req.body;

    const crudoNuevo = await modeloCrudos({
      nombre,
      peso,
      gramosPorcion,
      cantidadPorciones,
    });

    await crudoNuevo.save();

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar agregar un nuevo crudo en el backend: ${error}`
    );
  }
};

const ConsultarCrudos = async (req, res) => {
  try {
    const crudos = await modeloCrudos.find().lean().exec();
    res.send({ crudos });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar consultar los productos crudos dedesde el backend. ${error}`
    );
  }
};

const EditarCrudo = async (req, res) => {
  console.log(req.body.nombre);
  try {
    const crudoEditado = await modeloCrudos.updateOne(
      { _id: req.body._id },

      {
        $set: {
          nombre: req.body.nombre,
          peso: req.body.peso,
          gramosPorcion: req.body.gramosPorcion,
          cantidadPorciones: req.body.cantidadPorciones,
        },
      }
    );

    await res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el crudo: ${error}`
    );
  }
};

const EliminarCrudo = async (req, res) => {
  try {
    const { _id } = req.body;

    const eliminado = await modeloCrudos.deleteOne({ _id });
    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el crudo: ${error}`
    );
  }
};

const BuscarCrudos = async (req, res) => {
  try {
    const { nombre } = req.body;

    const crudosencontrados = await modeloCrudos.find({ nombre: nombre });

    console.log(...crudosencontrados);
    res.send(...crudosencontrados);
  } catch (error) {
    console.log(
      `ocurrio un error en le backend al buscar los crudos: ${error}`
    );
  }
};

module.exports = {
  AgregarCrudo,
  ConsultarCrudos,
  EditarCrudo,
  EliminarCrudo,
  BuscarCrudos,
};
