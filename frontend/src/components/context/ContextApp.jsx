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
  const [pizzasCopia, setPizzasCopia] = useState([]);

  //variables de ventas

  const [ventas, setVentas] = useState([]);
  const [ventasCopia, setVentasCopia] = useState([]);

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

  const AgregarPizza = async (nombre, precio, ingredientes) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/agregar/pizza", {
        nombre,
        precio,
        ingredientes,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarPizzas();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar una pizza: ${error} `
      );
    }
  };

  const ConsultarPizzas = async () => {
    try {
      const res = await axios.get(
        "http://192.168.18.222:4000/consultar/pizzas"
      );

      setPizzas((await res).data.pizzas);
      setPizzasCopia((await res).data.pizzas);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las  pizzas: ${error}`
      );
    }
  };

  const EditarPizza = async (_id, nombre, precio, ingredientes) => {
    const res = await axios.post("http://192.168.18.222:4000/editar/pizza", {
      _id,
      nombre,
      precio,
      ingredientes,
    });

    if ((await res).data.mensaje) {
      exito();
      ConsultarPizzas();
    }
    try {
    } catch (error) {
      console.log(
        `ocurrrio un error en el frontend al intentar editar la pizza: ${error} `
      );
    }
  };

  const EliminarPizza = async (_id) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/eliminar/pizza", {
        _id,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarPizzas();
      }
    } catch (error) {
      console.log(
        `ocurriro un error en el frontend al intentar eliminar la pizza: ${error}`
      );
    }
  };

  const BuscarPizzas = (nombre) => {
    const busqueda = pizzas.filter((iterador) => {
      if (iterador.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        return iterador;
      }
    });

    if (nombre == "") {
      setPizzasCopia(pizzas);
    } else {
      console.log(busqueda);
      setPizzasCopia(busqueda);
    }
  };

  //funciones de ventas

  const ConsultarVentas = async () => {
    try {
      const res = axios.get("http://192.168.18.222:4000/consultar/ventas");
      setVentas((await res).data.ventas);
      setVentasCopia((await res).data.ventas);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las ventas`
      );
    }
  };

  const AgregarVenta = async (
    fecha,
    datosCliente,
    datosTransaccion,
    hora,
    esVenta
  ) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/agregar/venta", {
        fecha,
        datosCliente,
        datosTransaccion,
        hora,
        esVenta,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarVentas();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar la preventa o venta: ${error}`
      );
    }
  };

  const EditarPreventa = async (
    _id,
    fecha,
    datosCliente,
    datosTransaccion,
    hora
  ) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/editar/preventa", {
        _id,
        fecha,
        datosCliente,
        datosTransaccion,
        hora,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarVentas();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar la venta: ${error}`
      );
    }
  };

  const EliminarPreventa = async (_id) => {
    try {
      const res = await axios.post(
        "http://192.168.18.222:4000/eliminar/preventa",
        {
          _id,
        }
      );

      if ((await res).data.mensaje) {
        exito();
        ConsultarVentas();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar la preventa: ${error}`
      );
    }
  };

  const ConfirmarPreventa = async (_id) => {
    const res = axios.post("http://192.168.18.222:4000/confirmar/preventa", {
      _id,
    });

    if ((await res).data.mensaje) {
      exito();
      ConsultarVentas();
    }

    try {
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar confirmar la preventa: ${error}`
      );
    }
  };

  const BuscarVentas = (dato) => {
    /* la busqueda se filtra por los siguientes parametros: 
    fecha, hora, nombre cliente, cedula, y valor compra de la venta.*/

    let resultados;

    if (dato == "") {
      setVentasCopia(ventas);
    } else {
      resultados = ventas.filter((venta) => {
        if (venta.fecha.includes(dato)) {
          return venta;
        } else if (venta.hora.toLowerCase().includes(dato.toLowerCase())) {
          return venta;
        } else if (
          venta.datosCliente.nombre.toLowerCase().includes(dato.toLowerCase())
        ) {
          return venta;
        } else if (
          venta.datosCliente.cedula
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return venta;
        } else if (
          venta.datosTransaccion.total
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return venta;
        }
      });

      setVentasCopia(resultados);
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

        createRaw: createRaw,
        getRaws: getRaws,
        updateRaw: updateRaw,
        deleteRaw: deleteRaw,
        searchRaws: searchRaws,
        raws: raws,
        rawsCopy: rawsCopy,

        createProcessed: createProcessed,
        getProcessed: getProcessed,
        updateProcessed: updateProcessed,
        deleteProcessed: deleteProcessed,
        searchProcessed: searchProcessed,
        processed: processed,
        processedCopy: processedCopy,

        pizzas: pizzas,
        pizzasCopia: pizzasCopia,
        AgregarPizza: AgregarPizza,
        ConsultarPizzas: ConsultarPizzas,
        EditarPizza: EditarPizza,
        EliminarPizza: EliminarPizza,
        BuscarPizzas: BuscarPizzas,
        AgregarVenta: AgregarVenta,
        ConsultarVentas: ConsultarVentas,
        ventas: ventas,
        ventasCopia: ventasCopia,
        EditarPreventa: EditarPreventa,
        EliminarPreventa: EliminarPreventa,
        ConfirmarPreventa: ConfirmarPreventa,
        BuscarVentas: BuscarVentas,
      }}
    >
      {props.children}
    </store.Provider>
  );
};

export default ContextApp;
