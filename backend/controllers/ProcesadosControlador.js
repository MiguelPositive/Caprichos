const { modeloProcesados } = require("../models/ProcesadosModelo.js");
const { modeloCrudos } = require("../models/CrudosModelo.js");

const AgregarProcesado = async (req, res) => {
  try {
    const { nombre, cantidad, ingredientes } = req.body;
    (await modeloCrudos.find()).map((crudos) => {
      //

      ingredientes.map(async (iterador) => {
        if (crudos.nombre == iterador.nombre) {
          //aca hago la resta

          let porciones = crudos.cantidadPorciones;

          //
          await modeloCrudos.updateOne(
            { _id: crudos._id },

            {
              $set: {
                nombre: crudos.nombre,
                peso: crudos.peso,
                gramosPorcion: crudos.gramosPorcion,
                cantidadPorciones: porciones - iterador.cantidad * cantidad,
              },
            }
          );
        }
      });
    });

    const nuevoProcesado = modeloProcesados({
      nombre,
      cantidad,
      ingredientes,
    });

    nuevoProcesado.save();

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrior un error en el backend al intentar  agregar el producto procesado: ${error}`
    );
  }
};

const ConsultarProcesados = async (req, res) => {
  try {
    const procesados = await modeloProcesados.find().lean().exec();

    res.send({ procesados });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los productos procesados: ${error}`
    );
  }
};

const EditarProcesado = async (req, res) => {
  try {
    const { _id, nombre, cantidad, ingredientes } = req.body;

    await modeloProcesados.updateOne(
      { _id },
      { $set: { nombre, cantidad, ingredientes } }
    );

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el producto procesado`
    );
  }
};

const EliminarProcesado = async (req, res) => {
  try {
    await modeloProcesados.deleteOne({ _id: req.body._id });
    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el producto procesado: ${error}`
    );
  }
};

module.exports = {
  AgregarProcesado,
  ConsultarProcesados,
  EditarProcesado,
  EliminarProcesado,
};
