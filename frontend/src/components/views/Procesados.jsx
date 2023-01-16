//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//material react ui
import { Paper, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Modal } from "@mui/material";
import { Fade } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";

//iconos
import NumbersIcon from "@mui/icons-material/Numbers";
import KitchenIcon from "@mui/icons-material/Kitchen";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//archivos externos
import AgregarProducto from "../buttons/AgregarProducto";
import EliminarCerrar from "../buttons/EliminarCerrar";
import AgregarIngredientes from "../buttons/AgregarIngredientes";
import Guardar from "../buttons/Guardar";
import { store } from "../context/ContextApp";
import Buscador from "../buttons/Buscador";
import AcccionesTabla from "../actions/AcccionesTabla";

const Procesados = () => {
  const {
    ConsultarCrudos,
    productosCrudos,
    AgregarProcesado,
    ConsultarProcesados,
    productosProcesados,
    productosProcesadosCopia,
    EditarProcesado,
    EliminarProcesado,
  } = useContext(store);

  const [modalProcesado, setModalProcesado] = useState(false);
  const [modalIngredientes, setModalIngredientes] = useState(false);

  const [idProcesado, setIdProcesado] = useState("");
  const [editor, setEditor] = useState(false);

  const [nombreProcesado, setNombreProcesado] = useState("");
  const [cantidadProcesado, setCantidadProcesado] = useState(0);

  const [valorSelector, setValorSelector] = useState("");
  const [cantidadPorciones, setCantidadPorciones] = useState(0);
  const [crudosSeleccionados, setCrudosSeleccionados] = useState([]);

  const [flecha, setFlecha] = useState(false);
  const [idColapse, setIdColapse] = useState("");

  //funciones abrir y cerrar

  const AbrirModalProcesado = () => {
    setModalProcesado(true);
  };

  const CerrarModalProcesado = () => {
    setModalProcesado(false);
  };

  const AbrirModalIngredientes = () => {
    setModalIngredientes(true);
  };

  const CerrarModalIngredientes = () => {
    setModalIngredientes(false);
  };

  const AbrirColapse = (id) => {
    if (id == idColapse) {
      setIdColapse("");
    } else {
      setIdColapse(id);
    }
  };

  //funciones de cambio

  const handleChangeNombreProcesado = (e) => {
    setNombreProcesado(e.target.value);
  };

  const handleChangeCantidadProcesado = (e) => {
    setCantidadProcesado(e.target.value);
  };

  const handleChangeSelector = (e) => {
    setValorSelector(e.target.value);
  };

  const handleChangeCantidadPorciones = (e) => {
    setCantidadPorciones(e.target.value);
  };

  //funciones agregar

  const AgregarCrudo = () => {
    const objeto = {
      nombre: valorSelector,
      cantidad: cantidadPorciones,
    };

    setCrudosSeleccionados([...crudosSeleccionados, objeto]);
  };

  //funciones eliminar

  const EliminarCrudo = (nombre) => {
    setCrudosSeleccionados(
      crudosSeleccionados.filter((iterador) => {
        if (iterador.nombre != nombre) {
          return iterador;
        }
      })
    );
  };

  const EliminarProcesadoo = (id) => {
    EliminarProcesado(id);
  };
  const Limpiar = () => {
    setIdColapse("");
    setIdProcesado("");
    setNombreProcesado("");
    setCantidadProcesado(null);
    setCrudosSeleccionados([]);
  };

  //funciones para editar
  const PrepararEditarProcesado = (id, nombree, cantidadd, ingredientes) => {
    setEditor(true);
    setIdProcesado(id);
    setNombreProcesado(nombree);
    setCantidadProcesado(cantidadd);
    setCrudosSeleccionados(ingredientes);
    AbrirModalProcesado();
  };

  //use effects

  useEffect(() => {
    ConsultarCrudos();
    ConsultarProcesados();
  }, []);
  return (
    <>
      <div
        className="container animate__animated animate__fadeIn"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="row mt-4">
          <div className="container">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="col-sm-2 col-md-2 col-lg-2 colx-xl-2 contenedor-agregar">
                <AgregarProducto
                  titulo={"Agregar Procesado"}
                  accion={AbrirModalProcesado}
                />
              </div>
              <div className="col-sm-8 col-md-9 col-lg-9 col-xl-10 contenedor-buscar">
                <Buscador producto={"procesados"} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="container">
            <Paper
              elevation={6}
              sx={{ height: "62vh" }}
              className="table-responsive"
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="col-4" align="center">
                        Producto Procesado
                      </TableCell>
                      <TableCell className="col-4" align="center">
                        Cantidad
                      </TableCell>
                      <TableCell className="col-4" align="center">
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {productosProcesadosCopia.map((iterador) => (
                      <TableRow key={iterador._id}>
                        <TableCell align="center" className="col-4">
                          {iterador.nombre}
                          <IconButton
                            onClick={() => {
                              AbrirColapse(iterador._id);
                            }}
                          >
                            {iterador._id == idColapse ? (
                              <div>
                                <KeyboardArrowDownIcon />
                              </div>
                            ) : (
                              <div>
                                <KeyboardArrowUpIcon />
                              </div>
                            )}
                          </IconButton>

                          <Collapse
                            in={iterador._id == idColapse}
                            timeout={"auto"}
                            unmountOnExit
                          >
                            <div
                              className="container"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div className="row">
                                <Paper elevation={6}>
                                  <TableContainer className="table-responsive">
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align="center">
                                            <b>Ingredientes</b>
                                          </TableCell>
                                          <TableCell align="center">
                                            <b>Porciones</b>
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>

                                      <TableBody>
                                        {iterador.ingredientes.map((i) => (
                                          <TableRow key={i.nombre}>
                                            <TableCell align="center">
                                              {i.nombre}
                                            </TableCell>
                                            <TableCell align="center">
                                              {i.cantidad}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Paper>
                              </div>
                            </div>
                          </Collapse>
                        </TableCell>
                        <TableCell className="col-4" align="center">
                          {iterador.cantidad}
                        </TableCell>

                        <TableCell className="col-4">
                          <AcccionesTabla
                            funcionEditar={() => {
                              PrepararEditarProcesado(
                                iterador._id,
                                iterador.nombre,
                                iterador.cantidad,
                                iterador.ingredientes
                              );
                            }}
                            funcionEliminar={() => {
                              EliminarProcesadoo(iterador._id);
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
      </div>

      {/* Modal añadir procesado / editor */}

      <Modal
        open={modalProcesado}
        className="animate__animated animate__fadeIn"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        onClose={CerrarModalProcesado}
      >
        <Fade in={modalProcesado} timeout={500}>
          <Paper
            elevation={6}
            className="container modal-sinfocus"
            sx={{
              width: "20rem",
              padding: "1.2rem 3rem 1.2rem 3rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div className="row ">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                <b>
                  {editor
                    ? "Editar Producto Procesado"
                    : "Agregar Producto Procesado"}
                </b>
              </h5>
            </div>

            <div className="row mt-2">
              <TextField
                type="text"
                variant="standard"
                fullWidth
                placeholder="Nombre Procesado"
                defaultValue={nombreProcesado}
                onChange={handleChangeNombreProcesado}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KitchenIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="row mt-4">
              <TextField
                type="number"
                variant="standard"
                fullWidth
                placeholder="Cantidad"
                defaultValue={cantidadProcesado}
                onChange={handleChangeCantidadProcesado}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-4">
              <div className="container">
                <Paper
                  elevation={6}
                  className="table-responsive"
                  sx={{ height: "8rem" }}
                >
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <b>Ingrediente</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Cantidad</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Accciones</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {crudosSeleccionados.map((iterador) => (
                          <TableRow key={iterador.nombre}>
                            <TableCell align="center">
                              {iterador.nombre}
                            </TableCell>
                            <TableCell align="center">
                              {iterador.cantidad}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <EliminarCerrar
                                eliminar={true}
                                accion={() => {
                                  EliminarCrudo(iterador.nombre);
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
              className="row mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <AgregarIngredientes
                  texto={"Agregar Ingredientes"}
                  accion={AbrirModalIngredientes}
                />
              </div>

              <div
                className="mt-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="mr-4">
                  <EliminarCerrar
                    eliminar={false}
                    accion={() => {
                      CerrarModalProcesado();
                      Limpiar();
                    }}
                  />
                </div>

                <div>
                  <Guardar
                    accion={
                      editor
                        ? () => {
                            EditarProcesado(
                              idProcesado,
                              nombreProcesado,
                              cantidadProcesado,
                              crudosSeleccionados
                            );

                            CerrarModalProcesado();
                          }
                        : () => {
                            setEditor(false);
                            Limpiar();
                            AgregarProcesado(
                              nombreProcesado,
                              cantidadProcesado,
                              crudosSeleccionados
                            );
                            Limpiar();
                            CerrarModalProcesado();
                          }
                    }
                  />
                </div>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      {/* Modal añadir ingredientes crudos */}

      <Modal open={modalIngredientes} onClose={CerrarModalIngredientes}>
        <Fade in={modalIngredientes} timeout={500}>
          <Paper
            elevation={6}
            className="container modal-sinfocus"
            sx={{
              width: "20rem",
              padding: "3rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div className="row">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                <b>Agregar Ingredientes Crudos</b>
              </h5>
            </div>

            <div
              className="row mt-4"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControl
                size="small"
                variant="outlined"
                sx={{ width: "100%" }}
              >
                <InputLabel>Ingredientes Crudos</InputLabel>
                <Select
                  value={valorSelector}
                  label="Ingredientes Crudos"
                  autoWidth
                  onChange={handleChangeSelector}
                >
                  <MenuItem value="">
                    <em>Seleccione un Ingrediente</em>
                  </MenuItem>

                  {productosCrudos.map((iterador) => (
                    <MenuItem value={iterador.nombre} key={iterador._id}>
                      {iterador.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="row mt-4">
              <TextField
                type="number"
                variant="standard"
                fullWidth
                placeholder="Cantidad de Porciones"
                onChange={handleChangeCantidadPorciones}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div
              className="row mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="mr-4">
                <EliminarCerrar
                  eliminar={false}
                  accion={CerrarModalIngredientes}
                />
              </div>

              <Guardar accion={AgregarCrudo} />
            </div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default Procesados;
