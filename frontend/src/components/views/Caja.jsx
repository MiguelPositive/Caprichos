//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//material react ui
import { Box, FormControl, InputLabel } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Modal } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Fade } from "@mui/material";

//icons
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import { NombreContexto } from "../context/ContextApp";

//externos
import Limpiar from "../buttons/Limpiar";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Guardar from "../buttons/Guardar";
import AgregarProducto from "../buttons/AgregarProducto";
import Agregar from "../buttons/Agregar";
import Detalles from "../buttons/Detalles";
import EditarPreventa_boton from "../buttons/EditarPreventa_boton";
import EliminarPreventa_boton from "../buttons/EliminarPreventa_boton";
import ConfirmarPreventa_boton from "../buttons/ConfirmarPreventa_boton";
import ImprimirFactura from "../buttons/ImprimirFactura";
import moment from "moment";
import logo from "../../img/Logo.png";
import "animate.css";
import "../../styles/Caja.css";

const Caja = () => {
  const {
    ConsultarPizzas,
    pizzas,
    AgregarVenta,
    ConsultarVentas,
    ventasCopia,
    cookies,
    EditarPreventa,
    EliminarPreventa,
    ConfirmarPreventa,
  } = useContext(NombreContexto);

  const [modalPizzas, setModalPizzas] = useState(false);

  //datos del cliente
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  //lista de pizzas que van a estar en la tabla
  const [productos, setProductos] = useState([]);

  //cantidad de pizzas que va estar cambiando
  const [cantidad, setCantidad] = useState(1);

  const [nombreTemporal, setNombreTemporal] = useState("");

  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [domicilio, setDomicilio] = useState(0);

  const [modalDetalles, setModalDetalles] = useState(false);
  const [datosImprimir, setDatosImprimir] = useState([]);

  const [editor, setEditor] = useState(false);

  let cargo = cookies.get("cargo");

  //datos que van a ser enviados a la db

  let fechaActual;
  let datosCliente;
  let datosTransaccion;
  let hora;
  let esVenta;

  //funciones abrir y cerrar

  const AbrirModalPizzas = () => {
    setModalPizzas(true);
  };

  const CerrarModalPizzas = () => {
    setModalPizzas(false);
  };

  const AbrirDetalles = () => {
    setModalDetalles(!modalDetalles);
  };

  //funciones de cambio
  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeCedula = (e) => {
    setCedula(parseInt(e.target.value));
  };

  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const handleChangeCantidadProducto = (e) => {
    setCantidad(parseInt(e.target.value));
  };

  const handlechangeNombreTemporal = (nombree) => {
    setNombreTemporal(nombree);
  };

  const handleChangeDomicilio = (e) => {
    setDomicilio(parseInt(e.target.value));
  };

  //funciones añadir

  //estas seran las pizzas que seran agregadas a la tabla
  const AgregarPizzas = (id, nombree, precioo, ingredientess) => {
    const objeto = {
      idPizza: id,
      nombre: nombree,
      cantidad: 1,
      valorUnidad: precioo,
      valorTotal: precioo * 1,
      ingredientes: ingredientess,
    };

    setProductos([...productos, objeto]);
  };

  const EnviarDatos = () => {
    const cliente = {
      nombre: nombre,
      cedula: cedula,
      telefono: telefono,
      direccion: direccion,
    };

    const transaccion = {
      productos: productos,
      subtotal: subtotal,
      total: total,
      valorDomicilio: domicilio,
      pagoCliente: 0,
      devueltos: 0,
    };

    fechaActual = moment().format("DD/MM/YYYY");
    datosCliente = cliente;
    datosTransaccion = transaccion;
    hora = moment().format("LT");
    esVenta = false;
  };

  //funciones de subtotal y total

  const RealizarSubtotal = (nombre) => {
    let productosAlterados = productos.map((iterador) => {
      if (iterador.nombre == nombre) {
        iterador.cantidad = cantidad;
        iterador.valorTotal = iterador.valorUnidad * cantidad;
      }
      return iterador;
    });

    setProductos(productosAlterados);
  };

  const ActualizarSubTotal = () => {
    let temp = 0;
    productos.forEach((iterador) => {
      temp = temp + iterador.valorTotal;
      return temp;
    });

    setSubTotal(temp);
  };

  const ActualizarTotal = () => {
    setTotal(subtotal + domicilio);
  };

  //funciones editar

  const PreparaEdicion = () => {
    //primero valido si es una venta o prevente y luego
    // valido si el cargo del usuario le permite editar esa venta

    const Ejecutar = () => {
      setEditor(true);
      setNombre(datosImprimir.datosCliente.nombre);
      setCedula(datosImprimir.datosCliente.cedula);
      setTelefono(datosImprimir.datosCliente.telefono);
      setDireccion(datosImprimir.datosCliente.direccion);
      setProductos(datosImprimir.datosTransaccion.productos);
      setDomicilio(datosImprimir.datosTransaccion.valorDomicilio);
    };

    //esVenta se inicializa como false, es decir, como una preventa
    if (!datosImprimir.esVenta) {
      Ejecutar();
    } else {
      if (cargo == "admin" || cargo == "visitante") {
        Ejecutar();
      } else {
        alert("no tiene autorizacion para editar una venta");
      }
    }
  };

  const Confirmar = () => {
    if (datosImprimir.esVenta) {
      alert("ya es una venta");
    } else {
      AbrirDetalles();
      ConfirmarPreventa(datosImprimir._id);
    }
  };

  //funciones eliminar

  const EliminarProducto = (nombre) => {
    let quitar = 0;
    const productosResultantes = productos.filter((iterador) => {
      if (iterador.nombre != nombre) {
        return iterador;
      } else if (iterador.nombre == nombre) {
        quitar = iterador.valorTotal;
      }
    });

    setProductos(productosResultantes);
    setSubTotal(subtotal - quitar);
  };

  // funciones imprimir factura

  const Imprimir = () => {
    let ventana = window.open();
    ventana.document.write(`
    
    
      <html lang="sp">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Factura de venta</title>
        </head>
        <body>
          <div
            class="contenedor"
            style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Roboto';
      "
          >
            <div
              class="factura"
              style="
          border-radius: 1rem;
          border: 1px solid gray;
          padding: 0.5rem;
          width: 20rem;
        "
            >
              <div style="display: flex; justify-content: center; align-items: center">
                <img src="${logo}" width="70%" />
              </div>
              <div style="width: 100%; text-align: center">
                ${datosImprimir.fecha}
              </div>
              <div style="width: 100%; text-align: center">
                NIT 1098807621-8
              </div>
              <div style="width: 100%; text-align: center">
                Cra. 28 #50 - 40, Sotomayor
              </div>
              <div style="width: 100%; text-align: center">
                Bucaramanga, Santander
              </div>
              <div style="width: 100%; text-align: center">300 6550004</div>
              <div style="width: 100%; text-align: center">
                Regimen Simplificado
              </div>
              <div style="width: 100%; text-align: center">Responsable</div>
              <div style="width: 100%; text-align: center">
                Carlos Iván Suarez Perez
              </div>
              <div style="width: 100%; text-align: center">
                Codigo de Factura
              </div>
              <div style="width: 100%; text-align: center">
                ${datosImprimir._id}
              </div>
              <div style="width: 100%; text-align: center; margin-top: 0.5rem ">
                Cliente: ${datosImprimir.datosCliente.nombre}
              </div>
              <div style="width: 100%; text-align: center">
                Cedula: ${datosImprimir.datosCliente.cedula}
              </div>
              <div style="width: 100%; text-align: center">
                Telefono: ${datosImprimir.datosCliente.telefono}
              </div>
              <div style="width: 100%; text-align: center">
                Domicilo: ${datosImprimir.datosCliente.direccion}
              </div>
              `);

    datosImprimir.datosTransaccion.productos.forEach((iterador) => {
      ventana.document.write(`
      
      <div style="width: 100%; text-align: center">
      Producto: ${iterador.nombre} 
      <br/>
      Cantidad: ${iterador.cantidad} 
      <br/> valor: ${iterador.valorTotal}
    </div>`);
    });

    ventana.document.write(`
              <div style="width: 100%; text-align: center">
                Valor Domicilio: ${datosImprimir.datosTransaccion.valorDomicilio}
              </div>
              <div style="width: 100%; text-align: center">
                Total: ${datosImprimir.datosTransaccion.total}
              </div>
              <div style="width: 100%; text-align: center">
                Valor Pagado: ${datosImprimir.datosTransaccion.pagoCliente}
              </div>
              <div style="width: 100%; text-align: center">
                Vueltos: ${datosImprimir.datosTransaccion.devueltos}
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    // ventana.print();
  };

  //funciones limpiar

  const LimpiarDatosCliente = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
  };

  const LimpiarDatosTransaccion = () => {
    setProductos([]);
    setDomicilio("");
    setCantidad("");
  };

  const LimpiarTodo = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
    setProductos([]);
    setDomicilio("");
    setCantidad("");
    setDatosImprimir([]);
  };

  //use effecs

  useEffect(() => {
    ConsultarPizzas();
    ConsultarVentas();
  }, []);

  useEffect(() => {
    RealizarSubtotal(nombreTemporal);
  }, [cantidad]);

  useEffect(() => {
    ActualizarSubTotal();
  }, [productos]);

  useEffect(() => {
    ActualizarTotal();
  }, [subtotal, domicilio]);

  return (
    <Box
      className="contenedor-caja container animate__animated animate__fadeIn"
      sx={{
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="row datos-cliente-venta" style={{ width: "100%" }}>
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 datos-cliente">
          <Paper
            elevation={4}
            sx={{
              height: "23rem",
              padding: "1rem 2rem 1.5rem 2rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ width: "100%", textAlign: "center" }}>
              Datos del Cliente
            </h3>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Nombre del Cliente"
                variant="standard"
                value={nombre}
                onChange={handleChangeNombre}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="CC del Cliente"
                type="number"
                variant="standard"
                value={cedula}
                onChange={handleChangeCedula}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Telefono del Cliente"
                type="number"
                variant="standard"
                value={telefono}
                onChange={handleChangeTelefono}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Dirección del Cliente"
                variant="standard"
                value={direccion}
                onChange={handleChangeDireccion}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeWorkRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div
              className="mt-2"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Limpiar accion={LimpiarDatosCliente} />
            </div>
          </Paper>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 ">
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              height: "23rem",
              padding: "1rem",
              borderRadius: "1rem",
            }}
            className="container datos-venta"
          >
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 ">
                <AgregarProducto
                  titulo={"Agregar Pizza"}
                  accion={AbrirModalPizzas}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12 ">
                {/* Tabla de pizzas a vender */}
                <Paper
                  elevation={6}
                  className="table-responsive"
                  sx={{ height: "9.5rem" }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <b>Nombre</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Cantidad</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Valor Unidad</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Valor Total</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Eliminar</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {productos.map((iterador) => (
                          <TableRow key={iterador.idPizza}>
                            <TableCell align="center">
                              {iterador.nombre}
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                variant="standard"
                                type="number"
                                value={iterador.cantidad}
                                onChange={(e) => {
                                  handleChangeCantidadProducto(e);
                                  handlechangeNombreTemporal(iterador.nombre);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {iterador.valorUnidad}
                            </TableCell>

                            <TableCell align="center">
                              {iterador.valorTotal}
                            </TableCell>

                            <TableCell
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <EliminarCerrar
                                eliminar={true}
                                accion={() => {
                                  EliminarProducto(iterador.nombre);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>

            <div
              className="row mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="col-sm-6 col-md-6 col-lg-6 subtotal">
                <div
                  style={{
                    borderRadius: "3rem",
                    background: "#D7D7D7",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <b>Subtotal: </b>
                  {subtotal}
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 total">
                <div
                  style={{
                    borderRadius: "3rem",
                    background: "#D7D7D7",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <b>Total: </b>
                  {total}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6 col-md-6 col-lg-6 valor-domicilio">
                <TextField
                  variant="outlined"
                  size="small"
                  label="valor del domicilio"
                  type="number"
                  value={domicilio}
                  onChange={handleChangeDomicilio}
                />
              </div>
              <div
                className="col-sm-6 col-md-6 col-lg-6 acciones-venta"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="mr-4">
                  <Limpiar accion={LimpiarDatosTransaccion} />
                </div>
                <div>
                  <Guardar
                    accion={
                      editor
                        ? () => {
                            EnviarDatos();
                            EditarPreventa(
                              datosImprimir._id,
                              fechaActual,
                              datosCliente,
                              datosTransaccion,
                              hora
                            );
                            setEditor(false);
                            LimpiarTodo();
                          }
                        : () => {
                            EnviarDatos();
                            AgregarVenta(
                              fechaActual,
                              datosCliente,
                              datosTransaccion,
                              hora,
                              esVenta
                            );
                            LimpiarTodo();
                          }
                    }
                  />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="row mt-5" style={{ width: "100%" }}>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <Paper
            elevation={6}
            className="table-responsive"
            sx={{ borderRadius: "1rem", marginBottom: "4rem" }}
          >
            {/* Tabla de ventas y preventas */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Fecha</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Hora</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cliente</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cedula</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Valor Compra</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Opciones</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ventasCopia.map((iterador) => (
                    <TableRow key={iterador._id}>
                      <TableCell align="center"> {iterador.fecha}</TableCell>
                      <TableCell align="center">{iterador.hora}</TableCell>
                      <TableCell align="center">
                        {iterador.datosCliente.nombre}
                      </TableCell>

                      <TableCell align="center">
                        {iterador.datosCliente.cedula}
                      </TableCell>
                      <TableCell align="center">
                        {iterador.datosTransaccion.total}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Detalles
                          accion={() => {
                            setDatosImprimir(iterador);

                            AbrirDetalles();
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
      {/* Modal para agregar pizzas a la pre-venta */}
      <Modal
        open={modalPizzas}
        onClose={CerrarModalPizzas}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={modalPizzas} timeout={500}>
          <Paper
            elevation={6}
            className="container modal-sinfocus"
            style={{
              position: "absolute",
              width: "20rem",
              padding: "0rem 1rem 1rem 1rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              style={{
                width: "2rem",
                position: "relative",
                top: "0rem",
                left: "17rem",
              }}
            >
              <EliminarCerrar eliminar={false} accion={CerrarModalPizzas} />
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h5 style={{ textAlign: "center" }}>Agregar Pizza</h5>
              </div>
            </div>
            <div
              className="row mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "1rem",
              }}
            >
              {/* Tabla de añadir pizzas */}
              <Paper
                elevation={6}
                sx={{ width: "15rem", height: "10rem" }}
                className="table-responsive"
              >
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {pizzas.map((iterador) => (
                        <TableRow key={iterador._id}>
                          <TableCell align="center">
                            {iterador.nombre}
                          </TableCell>
                          <TableCell align="center">
                            <Agregar
                              accion={() => {
                                AgregarPizzas(
                                  iterador._id,
                                  iterador.nombre,
                                  iterador.precio,
                                  iterador.ingredientes
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Paper>
        </Fade>
      </Modal>
      {/* Modal para abrir los detalles de la preventa */}
      <Modal
        open={modalDetalles}
        onClose={AbrirDetalles}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={modalDetalles} timeout={500}>
          <Paper
            elevation={6}
            className="contenedor-detalles modal-sinfocus container"
            sx={{
              width: "24rem",
              height: "11rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div>
                <EliminarCerrar
                  eliminar={false}
                  accion={() => {
                    AbrirDetalles();
                    LimpiarTodo();
                  }}
                />
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EditarPreventa_boton
                  accion={() => {
                    AbrirDetalles();
                    PreparaEdicion();
                  }}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EliminarPreventa_boton
                  accion={() => {
                    AbrirDetalles();
                    EliminarPreventa(datosImprimir._id);
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <ConfirmarPreventa_boton accion={Confirmar} />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <ImprimirFactura accion={Imprimir} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Caja;
