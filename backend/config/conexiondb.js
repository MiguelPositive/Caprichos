/*estoy usando el link de conexion de la version 2.2 de node js,
 porque el link de conexion que estaba usando (version 4.1 or later),
 generaba errores imprevistos.
 
 Ademas, como el link de conexion version 2.2 es viejo debo implementar
 la linea de codigo mongoose stric query*/

const mongoose = require("mongoose");

const conectarDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(
      process.env.MONGO_URI_2,

      {
        useNewURLParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Aplicacion conectada con exito a MongoDB en el puerto: ${connection.connection.port}`
    );
  } catch (error) {
    console.log(
      `ocurrio un error al intentar conectar la base de datos en el backend: ${error}  `
    );
  }
};

module.exports = {
  conectarDb,
};
