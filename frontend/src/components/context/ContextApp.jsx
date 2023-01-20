//react
import React, { useState } from "react";
import { createContext } from "react";

//archivos externos
import Cookies from "universal-cookie";
import axios from "axios";
import exito from "../alerts/exito.js";

export const store = createContext();
const ContextApp = (props) => {
  const cookies = new Cookies();

  //variable de confirmacion cookies

  const [confirmacion, setConfirmacion] = useState(false);

  //abrir menu lateral
  const [abrirMenu, setAbrirMenu] = useState(false);

  //variables de usuarios

  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);

  //variables de productos crudos
  const [raws, setRaws] = useState([]);
  const [rawsCopy, setRawsCopy] = useState([]);

  //variables de productos procesados
  const [processed, setprocessed] = useState([]);
  const [processedCopy, setprocessedCopy] = useState([]);

  //variables de pizzas

  const [pizzas, setPizzas] = useState([]);
  const [pizzasCopy, setPizzasCopy] = useState([]);

  //variables de ventas

  const [sales, setSales] = useState([]);
  const [salesCopy, setSalesCopy] = useState([]);

  //abrir menu lateral
  const handleOpenMenu = () => {
    setAbrirMenu(!abrirMenu);
  };

  const CrearCookie = (valor1, valor2, valor3) => {
    cookies.set("logeado", valor1, { path: "/" });
    cookies.set("usuario", valor2, { path: "/" });
    cookies.set("cargo", valor3, { path: "/" });
    setConfirmacion(!confirmacion);
  };

  const EliminarCookie = () => {
    cookies.remove("logeado");
    cookies.remove("usuario");
    cookies.remove("cargo");

    setConfirmacion(!confirmacion);
  };

  //funciones de usuarios

  const getUsers = async () => {
    try {
      const {
        data: { users },
      } = await axios.get("http://192.168.18.222:4000/get/users");
      setUsers(users);
      setUsersCopy(users);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar  consultar los usuarios: ${error}`
      );
    }
  };

  const createUser = async ({ user, password, position }) => {
    try {
      await axios.post("http://192.168.18.222:4000/create/user", {
        user,
        password,
        position,
      });

      exito();
      getUsers();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar el usuario: ${error}`
      );
    }
  };

  const updateUser = async ({ _id, user, password, position }) => {
    try {
      await axios.post("http://192.168.18.222:4000/update/user", {
        _id,
        user,
        password,
        position,
      });

      exito();
      getUsers();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el usuario: ${u}`
      );
    }
  };

  const deleteUser = async (_id) => {
    await axios.post("http://192.168.18.222:4000/delete/user", {
      _id,
    });

    exito();
    getUsers();
  };

  const searchUsers = (user) => {
    let filteredUsers = users.filter((user) => {
      return user.user.toLowerCase().includes(user);
    });

    if (user == "") {
      setUsersCopy(users);
    } else {
      setUsersCopy(filteredUsers);
    }
  };

  const validateUser = async (user, password) => {
    try {
      const {
        data: { isUser },
      } = await axios.post("http://192.168.18.222:4000/validate/user", {
        user,
        password,
      });

      return isUser;
    } catch (error) {
      console.log(
        `ocurrio un error  en le frontend al intentar enviar los datos del usuario para ser validado: ${error} `
      );
    }
  };

  const validatePosition = async (user) => {
    try {
      const {
        data: { position },
      } = await axios.post("http://192.168.18.222:4000/validate/position", {
        user,
      });

      return position;
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar validar el cargo: ${error} `
      );
    }
  };

  const createRaw = async ({ name, totalWeight, portionWeight }) => {
    try {
      await axios.post(
        "http://192.168.18.222:4000/create/raw",

        {
          name,
          totalWeight,
          portionWeight,
          portionsQuantity: totalWeight / portionWeight,
        }
      );
      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo hacia el backend: ${error}`
      );
    }
  };

  const getRaws = async () => {
    try {
      const {
        data: { raws },
      } = await axios.get("http://192.168.18.222:4000/get/raws");

      setRaws(raws);
      setRawsCopy(raws);
    } catch (error) {
      console.log(
        `ocurrio un error al intentar consultar los datos de los productos crudos en el frontend: ${error}`
      );
    }
  };

  const updateRaw = async ({ _id, name, totalWeight, portionWeight }) => {
    try {
      await axios.post("http://192.168.18.222:4000/update/raw", {
        _id,
        name,
        totalWeight,
        portionWeight,
        portionsQuantity: totalWeight / portionWeight,
      });

      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo para ser editado: ${error}`
      );
    }
  };

  const deleteRaw = async (_id) => {
    try {
      await axios.post("http://192.168.18.222:4000/delete/raw", {
        _id,
      });

      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar el crudo. ${error}`
      );
    }
  };

  const searchRaws = (element) => {
    let filteredRaws = raws.filter((raw) => {
      return raw.name.toLowerCase().includes(element.toLowerCase());
    });

    if (element == "") {
      setRawsCopy(raws);
    } else {
      setRawsCopy(filteredRaws);
    }
  };

  const createProcessed = async ({ name, quantity, ingredients }) => {
    try {
      await axios.post("http://192.168.18.222:4000/create/processed", {
        name,
        quantity,
        ingredients,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al agregar un producto procesado: ${error} `
      );
    }
  };

  const getProcessed = async () => {
    try {
      const {
        data: { processed },
      } = await axios.get("http://192.168.18.222:4000/get/processed");

      setprocessed(processed);
      setprocessedCopy(processed);
    } catch (error) {
      console.log(
        `ocurrio un error en el frotend al intentar consultar los productos procesados: ${error}`
      );
    }
  };

  const updateProcessed = async ({ _id, name, quantity, ingredients }) => {
    try {
      axios.post("http://192.168.18.222:4000/update/processed", {
        _id,
        name,
        quantity,
        ingredients,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el producto procesado`
      );
    }
  };

  const deleteProcessed = async (_id) => {
    try {
      await axios.post("http://192.168.18.222:4000/delete/processed", {
        _id,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar un producto procesado: ${eliminar}`
      );
    }
  };

  const searchProcessed = (name) => {
    const filteredProcessed = processed.filter((processedd) => {
      return processedd.name.toLowerCase().includes(name.toLowerCase());
    });

    if (name == "") {
      setprocessedCopy(processed);
    } else {
      setprocessedCopy(filteredProcessed);
    }
  };

  const createPizza = async ({ name, cost, ingredients }) => {
    try {
      await axios.post("http://192.168.18.222:4000/create/pizza", {
        name,
        cost,
        ingredients,
      });

      exito();
      getPizzas();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar una pizza: ${error} `
      );
    }
  };

  const getPizzas = async () => {
    try {
      const {
        data: { pizzas },
      } = await axios.get("http://192.168.18.222:4000/get/pizzas");

      setPizzas(pizzas);
      setPizzasCopy(pizzas);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las  pizzas: ${error}`
      );
    }
  };

  const updatePizza = async ({ _id, name, cost, ingredients }) => {
    await axios.post("http://192.168.18.222:4000/update/pizza", {
      _id,
      name,
      cost,
      ingredients,
    });

    exito();
    getPizzas();

    try {
    } catch (error) {
      console.log(
        `ocurrrio un error en el frontend al intentar editar la pizza: ${error} `
      );
    }
  };

  const deletePizza = async (_id) => {
    try {
      await axios.post("http://192.168.18.222:4000/delete/pizza", {
        _id,
      });

      exito();
      getPizzas();
    } catch (error) {
      console.log(
        `ocurriro un error en el frontend al intentar eliminar la pizza: ${error}`
      );
    }
  };

  const searchPizzas = (name) => {
    const filteredPizzas = pizzas.filter((iterador) => {
      return iterador.name.toLowerCase().includes(name.toLowerCase());
    });

    if (name == "") {
      setPizzasCopy(pizzas);
    } else {
      setPizzasCopy(filteredPizzas);
    }
  };

  const getSales = async () => {
    try {
      const {
        data: { sales },
      } = await axios.get("http://192.168.18.222:4000/get/sales");

      setSales(sales);
      setSalesCopy(sales);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las ventas`
      );
    }
  };

  const createSale = async (
    date,
    customerData,
    transactionData,
    hour,
    isSale
  ) => {
    try {
      await axios.post("http://192.168.18.222:4000/create/sale", {
        date,
        customerData,
        transactionData,
        hour,
        isSale,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar la preventa o venta: ${error}`
      );
    }
  };

  const updateSale = async (_id, customerData, transactionData) => {
    try {
      await axios.post("http://192.168.18.222:4000/update/sale", {
        _id,
        customerData,
        transactionData,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar la venta: ${error}`
      );
    }
  };

  const deleteSale = async ({ _id }) => {
    try {
      await axios.post("http://192.168.18.222:4000/delete/sale", {
        _id,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar la preventa: ${error}`
      );
    }
  };

  const confirmSale = async (_id, customerPay, returned) => {
    await axios.post("http://192.168.18.222:4000/confirm/sale", {
      _id,
      customerPay,
      returned,
    });

    exito();
    getSales();

    try {
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar confirmar la preventa: ${error}`
      );
    }
  };

  const searchSales = (dato) => {
    let filteredSales;

    if (dato == "") {
      setSalesCopy(sales);
    } else {
      filteredSales = sales.filter((sale) => {
        if (sale.date.includes(dato)) {
          return sale;
        } else if (sale.hour.toLowerCase().includes(dato.toLowerCase())) {
          return sale;
        } else if (
          sale.customerData.name.toLowerCase().includes(dato.toLowerCase())
        ) {
          return sale;
        } else if (
          sale.customerData.cedula
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return sale;
        } else if (
          sale.transactionData.total
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return sale;
        }
      });

      setSalesCopy(filteredSales);
    }
  };

  //funciones de caja

  return (
    <store.Provider
      value={{
        abrirMenu: abrirMenu,
        handleOpenMenu: handleOpenMenu,

        cookies: cookies,
        CrearCookie: CrearCookie,
        EliminarCookie: EliminarCookie,

        createUser,
        getUsers,
        updateUser,
        deleteUser,
        searchUsers,
        users,
        usersCopy,
        validateUser,
        validatePosition,

        createRaw,
        getRaws,
        updateRaw,
        deleteRaw,
        searchRaws,
        raws,
        rawsCopy,

        createProcessed,
        getProcessed,
        updateProcessed,
        deleteProcessed,
        searchProcessed,
        processed,
        processedCopy,

        createPizza,
        getPizzas,
        updatePizza,
        deletePizza,
        searchPizzas,
        pizzas,
        pizzasCopy,

        createSale,
        getSales,
        updateSale,
        deleteSale,
        confirmSale,
        searchSales,
        sales,
        salesCopy,
      }}
    >
      {props.children}
    </store.Provider>
  );
};

export default ContextApp;
