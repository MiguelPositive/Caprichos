const { rawsModel } = require("../models/CrudosModelo.js");

const createRaw = async (req, res) => {
  try {
    let { name, totalWeight, portionWeight, portionsQuantity } = req.body;

    const newRaw = await rawsModel({
      name,
      totalWeight,
      portionWeight,
      portionsQuantity,
    });

    await newRaw.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error al intentar agregar un nuevo crudo en el backend: ${error}`
    );
  }
};

const getRaws = async (req, res) => {
  try {
    const raws = await rawsModel.find().lean().exec();
    res.send({ raws });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar consultar los productos crudos dedesde el backend. ${error}`
    );
  }
};

const updateRaw = async (req, res) => {
  try {
    const { _id, name, totalWeight, portionWeight, portionsQuantity } =
      req.body;
    await rawsModel.updateOne(
      { _id },

      {
        $set: {
          name,
          totalWeight,
          portionWeight,
          portionsQuantity,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el crudo: ${error}`
    );
  }
};

const deleteRaw = async (req, res) => {
  try {
    const { _id } = req.body;

    await rawsModel.deleteOne({ _id });

    await res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el crudo: ${error}`
    );
  }
};

module.exports = {
  createRaw,
  getRaws,
  updateRaw,
  deleteRaw,
};
