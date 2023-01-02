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
