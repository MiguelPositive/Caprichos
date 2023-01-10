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
import EditarPreventa from "../buttons/EditarPreventa";
import EliminarPreventa from "../buttons/EliminarPreventa";
import ConfirmarPreventa from "../buttons/ConfirmarPreventa";
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
  } = useContext(NombreContexto);

  const [modalPizzas, setModalPizzas] = useState(false);

  //datos del cliente
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  //lista de pizzas que van a estar en la tabla
  const [productos, setProductos] = useState([]);

  //cantidad que va estar cambiando
  const [cantidad, setCantidad] = useState(1);

  const [nombreTemporal, setNombreTemporal] = useState("");

  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [domicilio, setDomicilio] = useState(0);

  const [detalles, setDetalles] = useState(false);
  const [datosImprimir, setDatosImprimir] = useState([]);

  //datos que van a ser enviados a la db

  let fechaActual;
  let datosCliente;
  let datosTransaccion;
  let hora;

  //funciones abrir y cerrar

  const AbrirModalPizzas = () => {
    setModalPizzas(true);
  };

  const CerrarModalPizzas = () => {
    setModalPizzas(false);
  };

  const AbrirDetalles = () => {
    setDetalles(!detalles);
  };

  //funciones de cambio
  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeCedula = (e) => {
    setCedula(e.target.value);
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
      esVenta: false,
    };

    fechaActual = moment().format("DD/MM/YYYY");
    datosCliente = cliente;
    datosTransaccion = transaccion;
    hora = moment().format("LT");
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

  const handleLimpiar = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
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
              <Limpiar accion={handleLimpiar} />
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
                                placeholder="1"
                                type="number"
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
                  <Limpiar />
                </div>
                <div>
                  <Guardar
                    accion={() => {
                      EnviarDatos();
                      AgregarVenta(
                        fechaActual,
                        datosCliente,
                        datosTransaccion,
                        hora
                      );
                    }}
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
                            AbrirDetalles();
                            setDatosImprimir(iterador);
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
        open={detalles}
        onClose={AbrirDetalles}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={detalles} timeout={500}>
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
                <EliminarCerrar eliminar={false} accion={AbrirDetalles} />
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EditarPreventa />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EliminarPreventa />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <ConfirmarPreventa />
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
