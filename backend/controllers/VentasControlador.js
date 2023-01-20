const { salesModel } = require("../models/VentasModelo.js");
const { processedModel } = require("../models/ProcesadosModelo.js");

const createSale = async (req, res) => {
  try {
    const { date, customerData, transactionData, hour, isSale } = req.body;

    (await processedModel.find()).forEach((processed) => {
      transactionData.products.forEach((products) => {
        products.ingredients.forEach(async (ingredients) => {
          if (processed.name == ingredients.name) {
            await processedModel.updateOne(
              { _id: processed._id },
              {
                $set: {
                  name: processed.name,
                  quantity:
                    processed.quantity -
                    ingredients.quantity * products.quantity,
                  ingredients: processed.ingredients,
                },
              }
            );
          }
        });
      });
    });

    const newSale = await salesModel({
      date,
      customerData,
      transactionData,
      hour,
      isSale,
    });
    newSale.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar la preventa o venta : ${error}`
    );
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await salesModel.find().lean().exec();
    res.send({ sales });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al inetntar consultar las ventas: ${error}`
    );
  }
};

const updateSale = async (req, res) => {
  try {
    const { _id, customerData, transactionData } = req.body;

    await salesModel.updateOne(
      { _id },
      {
        $set: {
          customerData,
          transactionData,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el frontend al intentar editar la venta: ${error}`
    );
  }
};

const confirmSale = async (req, res) => {
  try {
    const { _id, customerPay, returned } = req.body;

    console.log(_id);
    await salesModel.updateOne(
      { _id },
      {
        $set: {
          "transactionData.customerPay": customerPay,
          "transactionData.returned": returned,
          isSale: true,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar confirmar la venta: ${error}`
    );
  }
};

const deleteSale = async (req, res) => {
  try {
    const { _id } = req.body;
    await salesModel.deleteOne({ _id });
    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend la intentar eliminar la preventa o venta: ${error}`
    );
  }
};

module.exports = {
  createSale,
  getSales,
  updateSale,
  deleteSale,
  confirmSale,
};
