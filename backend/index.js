//express
const express = require("express");

//variables de entorno
const dotenv = require("dotenv");

//conexion
const { conectarDb } = require("./config/conexiondb.js");

//cors
const cors = require("cors");

//rutas
const { UsuariosRouter } = require("./routes/UsuariosRoutes.js");
const { CrudosRouter } = require("./routes/CrudosRoutes.js");
const { ProcesadosRouter } = require("./routes/ProcesadosRoutes.js");
const { PizzasRouter } = require("./routes/PizzasRoutes.js");

const app = express();

app.use(express.json());
dotenv.config();
conectarDb();

const puerto = process.env.PORT || 4000;

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

app.use(cors());
app.use("/", UsuariosRouter);
app.use("/", CrudosRouter);
app.use("/", ProcesadosRouter);
app.use("/", PizzasRouter);

app.listen(puerto, () => {
  console.log(`servidor listo en el puerto ${puerto}`);
});
