const { processedModel } = require("../models/ProcesadosModelo.js");
const { rawsModel } = require("../models/CrudosModelo.js");

const createProcessed = async (req, res) => {
  try {
    const { name, quantity, ingredients, portionCost } = req.body;

    (await rawsModel.find()).map((raw) => {
      //

      ingredients.map(async (ingredient) => {
        if (raw.name == ingredient.name) {
          //

          let portions = raw.portionsQuantity;

          //
          await rawsModel.updateOne(
            { _id: raw._id },

            {
              $set: {
                name: raw.name,
                totalWeight: raw.totalWeight,
                portionWeight: raw.portionWeight,
                portionsQuantity: portions - ingredient.quantity * quantity,
              },
            }
          );
        }
      });
    });

    const newProcessed = await processedModel({
      name,
      quantity,
      ingredients,
      portionCost,
    });

    newProcessed.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrior un error en el backend al intentar  agregar el producto procesado: ${error}`
    );
  }
};

const getProcessed = async (req, res) => {
  try {
    const processed = await processedModel.find().lean().exec();

    res.send({ processed });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los productos procesados: ${error}`
    );
  }
};

const updateProcessed = async (req, res) => {
  try {
    const { _id, name, quantity, ingredients, portionCost } = req.body;

    await processedModel.updateOne(
      { _id },
      { $set: { name, quantity, ingredients, portionCost } }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el producto procesado`
    );
  }
};

const deleteProcessed = async (req, res) => {
  try {
    await processedModel.deleteOne({ _id: req.body._id });

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el producto procesado: ${error}`
    );
  }
};

module.exports = {
  createProcessed,
  getProcessed,
  updateProcessed,
  deleteProcessed,
};
