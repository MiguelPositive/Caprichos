const { modeloVentas } = require("../models/VentasModelo.js");
const { modeloProcesados } = require("../models/ProcesadosModelo.js");

const AgregarVenta = async (req, res) => {
  try {
    const { fecha, datosCliente, datosTransaccion, hora, esVenta } = req.body;

    (await modeloProcesados.find()).forEach((procesados) => {
      datosTransaccion.productos.forEach((productos) => {
        productos.ingredientes.forEach(async (ingredientes) => {
          if (procesados.nombre == ingredientes.nombre) {
            await modeloProcesados.updateOne(
              { _id: procesados._id },
              {
                $set: {
                  nombre: procesados.nombre,
                  cantidad:
                    procesados.cantidad -
                    ingredientes.cantidad * productos.cantidad,
                  ingredientes: procesados.ingredientes,
                },
              }
            );
          }
        });
      });
    });

    const nuevaVenta = await modeloVentas({
      fecha,
      datosCliente,
      datosTransaccion,
      hora,
      esVenta,
    });
    nuevaVenta.save();
    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar la preventa o venta : ${error}`
    );
  }
};

const ConsultarVentas = async (req, res) => {
  try {
    const ventas = await modeloVentas.find().lean().exec();
    res.send({ ventas });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al inetntar consultar las ventas: ${error}`
    );
  }
};

const EditarPreventa = async (req, res) => {
  try {
    const { _id, fecha, datosCliente, datosTransaccion, hora } = req.body;

    (await modeloVentas.find()).forEach(async (elemento) => {
      if (_id == elemento._id) {
        await modeloVentas.updateOne(
          { _id },
          {
            $set: {
              fecha: elemento.fecha,
              datosCliente,
              datosTransaccion,
              hora: elemento.hora,
            },
          }
        );
      }
    });

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el frontend al intentar editar la venta: ${error}`
    );
  }
};

const ConfirmarPreventa = async (req, res) => {
  try {
    const { _id } = req.body;

    (await modeloVentas.find()).map(async (elemento) => {
      if (_id == elemento._id) {
        await modeloVentas.updateOne(
          { _id },
          {
            fecha: elemento.fecha,
            datosCliente: elemento.datosCliente,
            datosTransaccion: elemento.datosTransaccion,
            hora: elemento.hora,
            esVenta: true,
          }
        );
      }
    });

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar confirmar la venta: ${error}`
    );
  }
};

const EliminarPreventa = async (req, res) => {
  try {
    const { _id } = req.body;
    await modeloVentas.deleteOne({ _id });
    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend la intentar eliminar la preventa o venta: ${error}`
    );
  }
};

module.exports = {
  AgregarVenta,
  ConsultarVentas,
  EditarPreventa,
  EliminarPreventa,
  ConfirmarPreventa,
};
