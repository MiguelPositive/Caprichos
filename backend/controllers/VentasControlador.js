const { modeloVentas } = require("../models/VentasModelo.js");
const { modeloProcesados } = require("../models/ProcesadosModelo.js");

const AgregarVenta = async (req, res) => {
  try {
    const { fecha, datosCliente, datosTransaccion, hora } = req.body;

    (await modeloProcesados.find()).forEach((procesados) => {
      datosTransaccion.productos.forEach((productos) => {
        productos.ingredientes.forEach(async (ingredientes) => {
          if (procesados.nombre == ingredientes.nombre) {
            console.log(`producto procesado: ${procesados.nombre}`);
            console.log(`ingrediente de la venta: ${ingredientes.nombre}`);

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
    });
    nuevaVenta.save();
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar la preventa o venta : ${error}`
    );
  }
};

const ConsultarVentas = async (req, res) => {
  try {
    const ventas = (await modeloVentas.find()).lean().exec();
    res.send({ ventas });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al inetntar consultar las ventas: ${error}`
    );
  }
};

module.exports = { AgregarVenta, ConsultarVentas };
