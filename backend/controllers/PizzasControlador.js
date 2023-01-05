const { modeloPizzas } = require("../models/PizzasModelo.js");

const AgregarPizza = async (req, res) => {
  try {
    const { nombre, precio, ingredientes } = req.body;

    const nuevaPizza = await modeloPizzas({
      nombre,
      precio,
      ingredientes,
    });

    nuevaPizza.save();

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurrio un erro en el backend al intentar agregar la pizza: ${error}`
    );
  }
};

const ConsultarPizzas = async (req, res) => {
  try {
    const pizzas = await modeloPizzas.find().lean().exec();

    res.send({ pizzas });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar las pizzas: ${error}`
    );
  }
};

const EditarPizza = async (req, res) => {
  try {
    const { _id, nombre, precio, ingredientes } = req.body;

    await modeloPizzas.updateOne(
      { _id },
      { $set: { nombre, precio, ingredientes } }
    );

    res.json({ mensaje: true });
  } catch (error) {
    console.log(
      `ocurriro un error en el backend al intentar editar la pizza: ${error}`
    );
  }
};

const EliminarPizza = async (req, res) => {
  await modeloPizzas.deleteOne({ _id: req.body._id });

  res.json({ mensaje: true });

  try {
  } catch (error) {
    console.log(
      `ocurrio un errror en el backend al intentar eliminar una pizza: ${error}`
    );
  }
};

module.exports = { AgregarPizza, ConsultarPizzas, EditarPizza, EliminarPizza };
