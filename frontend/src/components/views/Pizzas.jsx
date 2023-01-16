//react
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

//react material ui
import { Fade } from "@mui/material";
import { Modal } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";

//iconos
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//arhivos externos
import AgregarProducto from "../buttons/AgregarProducto";
import Buscador from "../buttons/Buscador";
import AgregarIngredientes from "../buttons/AgregarIngredientes";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Guardar from "../buttons/Guardar";
import { store } from "../context/ContextApp";
import AcccionesTabla from "../actions/AcccionesTabla";
import "animate.css";

const Pizzas = () => {
  const {
    ConsultarProcesados,
    productosProcesados,
    AgregarPizza,
    ConsultarPizzas,
    pizzasCopia,
    EditarPizza,
    EliminarPizza,
  } = useContext(store);

  const [modalPizzas, setModalPizzas] = useState(false);
  const [modalProcesados, setModalProcesados] = useState(false);

  const [valorSelector, setValorSelector] = useState("");
  const [porcionesIngrediente, setPorcionesIngrediente] = useState(null);

  const [idColapse, setIdColapse] = useState("");
  const [idPizza, setIdPizza] = useState("");
  const [nombrePizza, setNombrePizza] = useState("");
  const [precioPizza, setPrecioPizza] = useState(0);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState(
    []
  );

  const [editor, setEditor] = useState(false);

  //abrir y cerrar modales

  const AbrirModalPizzas = () => {
    setModalPizzas(true);
  };

  const CerrarModalPizzas = () => {
    setModalPizzas(false);
  };

  const AbrirModalProcesados = () => {
    setModalProcesados(true);
  };

  const CerrarModalProcesados = () => {
    setModalProcesados(false);
  };

  //funciones de cambio

  const handleChangeNombrePizza = (e) => {
    setNombrePizza(e.target.value);
  };

  const handleChangePrecioPizza = (e) => {
    setPrecioPizza(e.target.value);
  };

  const handleChangeSelector = (e) => {
    setValorSelector(e.target.value);
  };

  const handleChangePorcionesIngrediente = (e) => {
    setPorcionesIngrediente(parseInt(e.target.value));
  };

  const handleChangeCapturarId = (id) => {
    if (idColapse == id) {
      setIdColapse("");
    } else {
      setIdColapse(id);
    }
  };

  //funciones agregar

  const AgregarIngrediente = () => {
    const objeto = {
      nombre: valorSelector,
      cantidad: porcionesIngrediente,
    };

    setIngredientesSeleccionados([...ingredientesSeleccionados, objeto]);
  };

  //funciones eliminar

  const EliminarIngrediente = (nombre) => {
    const temporal = ingredientesSeleccionados.filter((iterador) => {
      if (nombre != iterador.nombre) {
        return iterador;
      }
    });

    setIngredientesSeleccionados(temporal);
  };

  //funciones limpiar

  const Limpiar = () => {
    setIdColapse("");
    setIdPizza("");
    setNombrePizza("");
    setIngredientesSeleccionados([]);
  };

  //funciones de editar

  const ActivarEditor = () => {
    setEditor(true);
  };

  const DesactivarEditor = () => {
    setEditor(false);
  };

  const PreparEdicion = (id, nombree, ingredientess) => {
    ActivarEditor();
    setIdPizza(id);
    setNombrePizza(nombree);
    setIngredientesSeleccionados(ingredientess);
    AbrirModalPizzas();
  };

  //use effects

  useEffect(() => {
    ConsultarProcesados();
    ConsultarPizzas();
  }, []);

  return (
    <div
      className="container animate__animated animate__fadeIn"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="row mt-4 mb-3">
        <div className="container">
          <div
            className="row botones-agregar-buscar "
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="col-sm-2 col-md-2 col-lg-2 colx-xl-2 contenedor-agregar">
              <AgregarProducto
                titulo={"Agregar Pizza"}
                accion={() => {
                  DesactivarEditor();
                  AbrirModalPizzas();
                }}
              />
            </div>
            <div className="col-sm-8 col-md-9 col-lg-9 col-xl-10 contenedor-buscar">
              <Buscador producto={"pizzas"} />
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
                    <TableCell align="center">
                      <b>Nombre</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>Precio</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Acciones</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pizzasCopia.map((iterador) => (
                    <TableRow key={iterador._id}>
                      <TableCell align="center">
                        {iterador.nombre}

                        <IconButton
                          onClick={() => {
                            handleChangeCapturarId(iterador._id);
                          }}
                        >
                          {idColapse == iterador._id ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowUpIcon />
                          )}
                        </IconButton>

                        <Collapse
                          in={idColapse == iterador._id}
                          timeout="auto"
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
                              <Paper elevation={6} className="table-responsive">
                                <TableContainer>
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

                      <TableCell align="center">{iterador.precio}</TableCell>

                      <TableCell align="center">
                        <AcccionesTabla
                          funcionEliminar={() => {
                            EliminarPizza(iterador._id);
                          }}
                          funcionEditar={() => {
                            PreparEdicion(
                              iterador._id,
                              iterador.nombre,
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
      </div>

      {/* Modal agregar pizza / modo editor */}

      <Modal
        open={modalPizzas}
        onClose={CerrarModalPizzas}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={modalPizzas} timeout={500}>
          <Paper
            elevation={9}
            className="container modal-sinfocus"
            style={{
              width: "20rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "1.5rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="row">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                <b>{editor ? "Editar Pizza" : "Agregar Pizza"}</b>
              </h5>
            </div>

            <div className="row">
              <TextField
                placeholder="Nombre pizza"
                variant="standard"
                fullWidth
                onChange={handleChangeNombrePizza}
                defaultValue={nombrePizza}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPizzaRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-3">
              <TextField
                placeholder="Precio Pizza"
                variant="standard"
                fullWidth
                type="number"
                onChange={handleChangePrecioPizza}
                defaultValue={nombrePizza}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="row mt-4">
              <Paper
                elevation={9}
                sx={{ height: "10rem" }}
                className="table-responsive"
              >
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Ingrediente</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Porciones</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Eliminar</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {ingredientesSeleccionados.map((iterador) => (
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
                                EliminarIngrediente(iterador.nombre);
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
            <div className="row mt-4">
              <AgregarIngredientes
                texto={"Agregar Ingredientes"}
                accion={AbrirModalProcesados}
              />
            </div>

            <div
              className="row mt-4"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="mr-4">
                <EliminarCerrar
                  eliminar={false}
                  accion={() => {
                    CerrarModalPizzas();
                    Limpiar();
                  }}
                />
              </div>

              <div>
                <Guardar
                  accion={
                    editor
                      ? () => {
                          CerrarModalPizzas();
                          EditarPizza(
                            idPizza,
                            nombrePizza,
                            precioPizza,
                            ingredientesSeleccionados
                          );
                          Limpiar();
                        }
                      : () => {
                          CerrarModalPizzas();
                          AgregarPizza(
                            nombrePizza,
                            precioPizza,
                            ingredientesSeleccionados
                          );
                          Limpiar();
                        }
                  }
                />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      {/* Modal Agregar ingredientes procesados */}

      <Modal open={modalProcesados} onClose={CerrarModalProcesados}>
        <Fade in={modalProcesados} timeout={500}>
          <Paper
            elevation={9}
            sx={{
              width: "20rem",
              display: "flex",
              justifyContent: "center",
              padding: "3rem",
              flexWrap: "wrap",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            className="container"
          >
            <div className="row">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                Agregar Ingredientes
              </h5>
            </div>

            <div className="row mt-4" style={{ width: "100%" }}>
              <FormControl
                size="small"
                variant="outlined"
                sx={{ width: "100%" }}
              >
                <InputLabel>Ingredientes Procesados</InputLabel>
                <Select
                  value={valorSelector}
                  label="Ingredientes Procesados"
                  className="modal-sinfocus"
                  autoWidth
                  onChange={handleChangeSelector}
                >
                  <MenuItem value="">
                    <em>Seleccione un Ingrediente</em>
                  </MenuItem>
                  {productosProcesados.map((iterador) => (
                    <MenuItem key={iterador._id} value={iterador.nombre}>
                      {iterador.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="row mt-4">
              <TextField
                placeholder="Cantidad Porciones"
                type="number"
                variant="standard"
                fullWidth
                onChange={handleChangePorcionesIngrediente}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon />
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
              }}
            >
              <div className="mr-4">
                <EliminarCerrar
                  eliminar={false}
                  accion={CerrarModalProcesados}
                />
              </div>
              <div>
                <Guardar accion={AgregarIngrediente} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Pizzas;
