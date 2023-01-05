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
import "animate.css";

const Caja = () => {
  const { ConsultarPizzas, pizzas } = useContext(NombreContexto);

  const [modalPizzas, setModalPizzas] = useState(false);

  //datos del cliente
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  //lista de pizzas que van a estar en la tabla
  const [productos, setProductos] = useState([]);

  //cantidad que va estar cambiando
  const [cantidad, setCantidad] = useState(0);

  const [nombreTemporal, setNombreTemporal] = useState("");

  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [domicilio, setDomicilio] = useState(0);

  //funciones abrir y cerrar

  const AbrirModalPizzas = () => {
    setModalPizzas(true);
  };

  const CerrarModalPizzas = () => {
    setModalPizzas(false);
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
    setCantidad(e.target.value);
  };

  const handlechangeNombreTemporal = (nombree) => {
    setNombreTemporal(nombree);
  };

  const handleChangeDomicilio = (e) => {
    setDomicilio(e.target.value);
  };

  //funciones añadir

  //estas seran las pizzas que seran agregadas a la tabla
  const AgregarPizzas = (id, nombree, precioo, ingredientess) => {
    const objeto = {
      _id: id,
      nombre: nombree,
      cantidad: 1,
      valorUnidad: precioo,
      valorTotal: precioo * 1,
      ingredientes: ingredientess,
    };

    setProductos([...productos, objeto]);
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

  //funciones limpiar

  const handleLimpiar = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
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
    const sub = productos.map((iterador) => {
      temp = temp + iterador.valorTotal;
      return temp;
    });

    setSubTotal(sub);
  };

  const ActualizarTotal = () => {
    setTotal(subtotal + domicilio);
  };

  //use effecs

  useEffect(() => {
    ConsultarPizzas();
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
      className="contenedor-caja container"
      sx={{
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "80vh",
      }}
    >
      <Box className="contenedor-columnas">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
            <Paper
              elevation={4}
              sx={{
                width: "100%",
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

          <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
            <Paper
              elevation={4}
              sx={{
                width: "100%",
                height: "23rem",
                padding: "1rem",
                borderRadius: "1rem",
              }}
              className="container"
            >
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <AgregarProducto
                    titulo={"Agregar Pizza"}
                    accion={AbrirModalPizzas}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-sm-12 col-md-12 col-lg-12">
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
                            <TableRow key={iterador._id}>
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

              <div className="row mt-3">
                <div className="col-sm-6">
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

                <div className="col-sm-6">
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
                <div className="col-sm-6">
                  <TextField
                    variant="outlined"
                    size="small"
                    label="valor del domicilio"
                    type="number"
                    onChange={handleChangeDomicilio}
                  />
                </div>
                <div
                  className="col-sm-6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="mr-4">
                    <Limpiar />
                  </div>
                  <div>
                    <Guardar />
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>

        {/* Modal agregar pizza */}

        <Modal open={modalPizzas} onClose={CerrarModalPizzas}>
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
        </Modal>
      </Box>
    </Box>
  );
};

export default Caja;
