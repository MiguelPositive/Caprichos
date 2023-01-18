const { usersModel } = require("../models/UsuariosModelo.js");

const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find().lean().exec();

    res.send({ users });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los datos: ${error}`
    );
  }
};

const createUser = async (req, res) => {
  try {
    const { user, password, position } = req.body;
    const newUser = await usersModel({ user, password, position });

    newUser.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar agregar el usaurio: ${error}`
    );
  }
};

const validateUser = async (req, res) => {
  try {
    const { user, password } = req.body;

    let isUser = false;
    (await usersModel.find()).forEach((iterator) => {
      if (iterator.user === user && iterator.password === password) {
        isUser = true;
      }
    });
    res.send({ isUser });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar validar el usuario`
    );
  }
};

const validatePosition = async (req, res) => {
  try {
    const { user } = req.body;
    let position;

    (await usersModel.find()).forEach((iterator) => {
      if (iterator.user == user) {
        position = iterator.position;
      }
    });
    res.send({ position });
  } catch (error) {
    console.log(
      `ocurrio un error al intentar validar el cargo en el backend ${error}`
    );
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, user, password, position } = req.body;
    await usersModel.updateOne({ _id }, { $set: { user, password, position } });

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar editar el usuario: ${error}`
    );
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;

    await usersModel.deleteOne({ _id });

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar eliminar el usuario: ${error}`
    );
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  validateUser,
  validatePosition,
};
