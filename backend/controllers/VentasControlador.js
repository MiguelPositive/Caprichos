const { modeloVentas } = require("../models/VentasModelo.js");

const AgregarVenta = async (req, res) => {
  try {
    const { fecha, datosCliente, datosTransaccion } = req.body;

    const nuevaVenta = await modeloVentas({
      fecha,
      datosCliente,
      datosTransaccion,
    });

    nuevaVenta.save();

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar la preventa o venta : ${error}`
    );
  }
};

module.exports = { AgregarVenta };
