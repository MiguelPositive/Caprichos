const { pizzasModel } = require("../models/PizzasModelo.js");

const createPizza = async (req, res) => {
  try {
    const { name, ingredients, productionCost, saleValue } = req.body;

    const newPizza = await pizzasModel({
      name,
      ingredients,
      productionCost,
      saleValue,
    });

    newPizza.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un erro en el backend al intentar agregar la pizza: ${error}`
    );
  }
};

const getPizzas = async (req, res) => {
  try {
    const pizzas = await pizzasModel.find().lean().exec();

    res.send({ pizzas });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar las pizzas: ${error}`
    );
  }
};

const updatePizza = async (req, res) => {
  try {
    const { _id, name, cost, ingredients } = req.body;

    await pizzasModel.updateOne({ _id }, { $set: { name, cost, ingredients } });

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurriro un error en el backend al intentar editar la pizza: ${error}`
    );
  }
};

const deletePizza = async (req, res) => {
  const { _id } = req.body;
  await pizzasModel.deleteOne({ _id });

  res.sendStatus(200);

  try {
  } catch (error) {
    console.log(
      `ocurrio un errror en el backend al intentar eliminar una pizza: ${error}`
    );
  }
};

module.exports = {
  createPizza,
  getPizzas,
  updatePizza,
  deletePizza,
};
