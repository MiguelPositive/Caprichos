//react
import React, { useState } from "react";
import { createContext } from "react";

//archivos externos
import Cookies from "universal-cookie";
import axios from "axios";
import exito from "../alerts/exito.js";

export const NombreContexto = createContext();
const ContextApp = (props) => {
  const cookies = new Cookies();

  //variable de confirmacion cookies

  const [confirmacion, setConfirmacion] = useState(false);

  //abrir menu lateral
  const [abrirMenu, setAbrirMenu] = useState(false);

  //variables de productos crudos
  const [productosCrudos, setProductosCrudos] = useState([]);
  const [productosCrudosCopia, setProductosCrudosCopia] = useState([]);

  //variables de productos procesados
  const [productosProcesados, setProductosProcesados] = useState([]);
  const [productosProcesadosCopia, setProductosProcesadosCopia] = useState([]);

  //variables de pizzas

  const [pizzas, setPizzas] = useState([]);
  const [pizzasCopia, setPizzasCopia] = useState([]);

  //variables de ventas

  const [ventas, setVentas] = useState([]);
  const [ventasCopia, setVentasCopia] = useState([]);

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
    console.log("cookies eliminadas");
    cookies.remove("logeado");
    cookies.remove("usuario");
    cookies.remove("cargo");

    setConfirmacion(!confirmacion);
  };

  //funciones de usuarios

  const HacerValidacionUsuario = async (usuarioo, contrasenaa) => {
    console.log(`usuario: ${usuarioo} contraseña: ${contrasenaa}`);
    try {
      const res = await axios.post(
        "http://192.168.18.222:4000/validar/usuario",
        {
          usuario: usuarioo,
          contrasena: contrasenaa,
        }
      );

      return res.data;
    } catch (error) {
      console.log(
        `ocurrio un error  en le frontend al intentar enviar los datos del usuario para ser validado: ${error} `
      );
    }
  };

  const HacerValidacionCargo = async (usuarioo) => {
    console.log(`usuario obtenido en la funcion validar cargo: ${usuarioo}`);
    try {
      const res = await axios.post("http://192.168.18.222:4000/validar/cargo", {
        usuario: usuarioo,
      });

      console.log(`res.data: ${res.data} `);
      return res.data;
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar validar el cargo: ${error} `
      );
    }
  };

  //funciones de crudos

  const AgregarCrudo = async (v1, v2, v3) => {
    try {
      const req = axios.post(
        "http://192.168.18.222:4000/agregar/crudo",

        {
          nombre: v1,
          peso: v2,
          gramosPorcion: v3,
          cantidadPorciones: v2 / v3,
        }
      );

      if ((await req).data.mensaje == true) {
        exito();
        ConsultarCrudos();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo hacia el backend: ${error}`
      );
    }
  };

  const ConsultarCrudos = async () => {
    try {
      const res = await axios.get(
        "http://192.168.18.222:4000/consultar/crudos"
      );

      setProductosCrudos(res.data.crudos);
      setProductosCrudosCopia(res.data.crudos);
    } catch (error) {
      console.log(
        `ocurrio un error al intentar consultar los datos de los productos crudos en el frontend: ${error}`
      );
    }
  };

  const EditarCrudo = async (id, nombree, pesoo, gramosporcion) => {
    try {
      const res = await axios.post("http://192.168.18.222:4000/editar/crudo", {
        _id: id,
        nombre: nombree,
        peso: pesoo,
        gramosPorcion: gramosporcion,
        cantidadPorciones: pesoo / gramosporcion,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarCrudos();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo para ser editado: ${error}`
      );
    }
  };

  const EliminarCrudo = async (id) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/eliminar/crudo", {
        _id: id,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarCrudos();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar el crudo. ${error}`
      );
    }
  };

  const BuscarCrudos = (elemento) => {
    let resultadoBusqueda = productosCrudos.filter((iterador) => {
      if (
        iterador.nombre
          .toString()
          .toLowerCase()
          .includes(elemento.toLowerCase())
      ) {
        return iterador;
      }
    });

    console.log(elemento);
    if (elemento == "") {
      setProductosCrudosCopia(productosCrudos);
    } else {
      setProductosCrudosCopia(resultadoBusqueda);
    }

    console.log(resultadoBusqueda);
  };

  //funciones de procesados

  const AgregarProcesado = async (nombre, cantidad, ingredientes) => {
    try {
      const res = await axios.post(
        "http://192.168.18.222:4000/agregar/procesado",
        {
          nombre,
          cantidad,
          ingredientes,
        }
      );

      if ((await res).data.mensaje) {
        exito();
        ConsultarProcesados();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al agregar un producto procesado: ${error} `
      );
    }
  };

  const ConsultarProcesados = async () => {
    try {
      const res = await axios.get(
        "http://192.168.18.222:4000/consultar/procesados"
      );

      setProductosProcesados((await res).data.procesados);
      setProductosProcesadosCopia((await res).data.procesados);
    } catch (error) {
      console.log(
        `ocurrio un error en el frotend al intentar consultar los productos procesados: ${error}`
      );
    }
  };

  const EditarProcesado = async (_id, nombre, cantidad, ingredientes) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/editar/procesado", {
        _id,
        nombre,
        cantidad,
        ingredientes,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarProcesados();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el producto procesado`
      );
    }
  };

  const EliminarProcesado = async (_id) => {
    try {
      const res = axios.post("http://192.168.18.222:4000/eliminar/procesado", {
        _id,
      });

      if ((await res).data.mensaje) {
        exito();
        ConsultarProcesados();
      }
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar un producto procesado: ${eliminar}`
      );
    }
  };

  const BuscarProcesados = (nombre) => {
    const elementos = productosProcesados.filter((iterador) => {
      if (
        iterador.nombre.toString().toLowerCase().includes(nombre.toLowerCase())
      ) {
        return iterador;
      }
    });

    if (nombre == "") {
      setProductosProcesadosCopia(productosProcesados);
    } else {
      setProductosProcesadosCopia(elementos);
    }
  };

  //funciones de pizzas

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
    }

    try {
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar confirmar la preventa: ${error}`
      );
    }
  };

  //funciones de caja

  return (
    <NombreContexto.Provider
      value={{
        cookies: cookies,
        CrearCookie: CrearCookie,
        EliminarCookie: EliminarCookie,
        HacerValidacionUsuario: HacerValidacionUsuario,
        HacerValidacionCargo: HacerValidacionCargo,
        abrirMenu: abrirMenu,
        handleOpenMenu: handleOpenMenu,
        AgregarCrudo: AgregarCrudo,
        ConsultarCrudos: ConsultarCrudos,
        productosCrudos: productosCrudos,
        productosCrudosCopia: productosCrudosCopia,
        EditarCrudo: EditarCrudo,
        EliminarCrudo: EliminarCrudo,
        BuscarCrudos: BuscarCrudos,
        AgregarProcesado: AgregarProcesado,
        ConsultarProcesados: ConsultarProcesados,
        productosProcesados: productosProcesados,
        productosProcesadosCopia: productosProcesadosCopia,
        EliminarProcesado: EliminarProcesado,
        BuscarProcesados: BuscarProcesados,
        EditarProcesado: EditarProcesado,
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
      }}
    >
      {props.children}
    </NombreContexto.Provider>
  );
};

export default ContextApp;
