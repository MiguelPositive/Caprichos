const { modeloVentas } = require("../models/VentasModelo.js");

const ActualizarInventario = async () => {
  let ingredientes;

  (await modeloVentas.find()).map(async (iterador) => {
    console.log("iterador");
    console.log(await iterador.datos.length);
  });
};

const AgregarVenta = async (req, res) => {
  try {
    const { fecha, datos } = req.body;

    const Agregar = async () => {
      const nuevaVenta = await modeloVentas({ fecha, datos });
      nuevaVenta.save();
    };

    const temp = await modeloVentas.find();

    if (temp == "") {
      Agregar();
      ActualizarInventario();
    } else {
      (await modeloVentas.find()).map(async (iterador) => {
        if (iterador.fecha == fecha) {
          await modeloVentas.updateOne(
            { _id: iterador._id },
            {
              $set: {
                fecha: fecha,
                datos: [...iterador.datos, datos],
              },
            }
          );
        } else {
          Agregar();
          ActualizarInventario();
        }
      });
      ActualizarInventario();
    }
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar la preventa o venta : ${error}`
    );
  }
};

module.exports = { AgregarVenta };
