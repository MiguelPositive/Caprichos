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

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosCopia, setUsuariosCopia] = useState([]);

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

  const ConsultarUsuarios = async () => {
    try {
      const res = axios.get("http://192.168.18.222:4000/consultar/usuarios");
      setUsuarios((await res).data.usuarios);
      setUsuariosCopia((await res).data.usuarios);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar  consultar los usuarios: ${error}`
      );
    }
  };

  const AgregarUsuario = async (usuario, contrasena, cargo) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/agregar/usuario", {
        usuario,
        contrasena,
        cargo,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarUsuarios();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar el usuario: ${error}`
      );
    }
  };

  const HacerValidacionUsuario = async (usuario, contrasena) => {
    try {
      const res = await axios.post(
        "http://192.168.18.222:4000/validar/usuario",
        {
          usuario,
          contrasena,
        }
      );

      return (await res).data.mensaje;
    } catch (error) {
      console.log(
        `ocurrio un error  en le frontend al intentar enviar los datos del usuario para ser validado: ${error} `
      );
    }
  };

  const HacerValidacionCargo = async (usuario) => {
    try {
      const res = await axios.post("http://192.168.18.222:4000/validar/cargo", {
        usuario,
      });

      return (await res).data.cargo;
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar validar el cargo: ${error} `
      );
    }
  };

  const EditarUsuario = async (_id, usuario, contrasena, cargo) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/editar/usuario", {
        _id,
        usuario,
        contrasena,
        cargo,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarUsuarios();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el usuario: ${u}`
      );
    }
  };

  const EliminarUsuario = async (_id) => {
    const res = axios.post("http://192.168.18.222:4000/eliminar/usuario", {
      _id,
    });

    if ((await res).data.mensaje) {
      exito();
      ConsultarUsuarios();
    }
  };

  const BuscarUsuarios = (usuario) => {
    if (usuario == "") {
      setUsuariosCopia(usuarios);
    } else {
      let resultados = usuarios.filter((iterador) => {
        if (iterador.usuario.toLowerCase().includes(usuario)) {
          return iterador;
        }
      });

      setUsuariosCopia(resultados);
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
    let filteredRaws = raws.filter((iterador) => {
      if (
        iterador.name.toString().toLowerCase().includes(element.toLowerCase())
      ) {
        return iterador;
      }
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
      if (
        processedd.name.toString().toLowerCase().includes(name.toLowerCase())
      ) {
        return processedd;
      }
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
      if (iterador.name.toLowerCase().includes(name.toLowerCase())) {
        return iterador;
      }
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

  const updateSale = async (
    _id,
    date,
    customerData,
    transactionData,
    hour,
    isSale
  ) => {
    try {
      await axios.post("http://192.168.18.222:4000/update/sale", {
        _id,
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

  const confirmSale = async ({ _id }) => {
    await axios.post("http://192.168.18.222:4000/confirm/sale", {
      _id,
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

        AgregarUsuario: AgregarUsuario,
        ConsultarUsuarios: ConsultarUsuarios,
        EditarUsuario: EditarUsuario,
        EliminarUsuario: EliminarUsuario,
        BuscarUsuarios: BuscarUsuarios,
        usuarios: usuarios,
        usuariosCopia: usuariosCopia,
        HacerValidacionUsuario: HacerValidacionUsuario,
        HacerValidacionCargo: HacerValidacionCargo,

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
