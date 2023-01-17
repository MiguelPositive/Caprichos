//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//mui
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

//externos
import { store } from "../context/ContextApp";
import AgregarProducto from "../buttons/AgregarProducto";
import EliminarCerrar from "../buttons/EliminarCerrar";
import AgregarIngredientes from "../buttons/AgregarIngredientes";
import Guardar from "../buttons/Guardar";
import Buscador from "../buttons/Buscador";
import AcccionesTabla from "../actions/AcccionesTabla";

const Procesados = () => {
  const {
    getRaws,
    raws,
    createProcessed,
    getProcessed,
    updateProcessed,
    deleteProcessed,
    processedCopy,
  } = useContext(store);

  const [processedModal, setProcessedModal] = useState(false);
  const [ingredientsModal, setIngredientsModal] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(null);

  const [modeEditor, setModeEditor] = useState(false);

  const [selectorValue, setSelectorValue] = useState("");
  const [rawPortions, setRawPortions] = useState(null);
  const [selectedRaws, setSelectedRaws] = useState([]);

  const [idColapse, setIdColapse] = useState("");

  const Clean = () => {
    setIdColapse("");
    setId("");
    setName("");
    setQuantity(null);
    setSelectedRaws([]);
    setModeEditor(false);
  };

  const handleClickOpenProcessedModal = () => {
    setProcessedModal(!processedModal);
  };

  const handleClickOpenIngredientsModal = () => {
    setIngredientsModal(!ingredientsModal);
  };

  const handleClickOpenColapse = (id) => {
    if (id == idColapse) {
      setIdColapse("");
    } else {
      setIdColapse(id);
    }
  };

  const handleClickCloseProcessedModal = () => {
    handleClickOpenProcessedModal();
    setTimeout(() => {
      Clean();
    }, 350);
  };

  const handleClickCloseIngredientsdModal = () => {
    handleClickOpenIngredientsModal();
    setTimeout(() => {
      Clean();
    }, 350);
  };

  const handleChangeProcessedName = (e) => {
    setName(e.target.value);
  };

  const handleChangeProcessedQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleChangeSelectorValue = (e) => {
    setSelectorValue(e.target.value);
  };

  const handleChangeRawPortions = (e) => {
    setRawPortions(parseInt(e.target.value));
  };

  const addRaw = () => {
    const newRaw = {
      name: selectorValue,
      quantity: rawPortions,
    };

    setSelectedRaws([...selectedRaws, newRaw]);
  };

  const update = (processed) => {
    const { _id, name, quantity, ingredients } = processed;

    setModeEditor(true);
    setId(_id);
    setName(name);
    setQuantity(quantity);
    setSelectedRaws(ingredients);
    handleClickOpenProcessedModal();
  };

  const handleSubmit = () => {
    const processed = {
      _id: id,
      name: name,
      quantity: quantity,
      ingredients: selectedRaws,
    };

    if (modeEditor) {
      updateProcessed(processed);
      handleClickOpenProcessedModal();
      Clean();
    } else {
      createProcessed(processed);
      handleClickOpenProcessedModal();
      Clean();
    }
  };

  const deleteRaw = (nombre) => {
    setSelectedRaws(
      selectedRaws.filter((iterador) => {
        if (iterador.nombre != nombre) {
          return iterador;
        }
      })
    );
  };

  useEffect(() => {
    getRaws();
    getProcessed();
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
                  accion={handleClickOpenProcessedModal}
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
                    {processedCopy.map((iterador) => (
                      <TableRow key={iterador._id}>
                        <TableCell align="center" className="col-4">
                          {iterador.name}
                          <IconButton
                            onClick={() => {
                              handleClickOpenColapse(iterador._id);
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
                                        {iterador.ingredients.map(
                                          (ingredient) => (
                                            <TableRow key={ingredient.name}>
                                              <TableCell align="center">
                                                {ingredient.name}
                                              </TableCell>
                                              <TableCell align="center">
                                                {ingredient.quantity}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Paper>
                              </div>
                            </div>
                          </Collapse>
                        </TableCell>
                        <TableCell className="col-4" align="center">
                          {iterador.quantity}
                        </TableCell>

                        <TableCell className="col-4">
                          <AcccionesTabla
                            funcionEditar={() => {
                              update(iterador);
                            }}
                            funcionEliminar={() => {
                              deleteProcessed(iterador._id);
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

      <Modal
        open={processedModal}
        className="animate__animated animate__fadeIn"
        onClose={handleClickCloseProcessedModal}
      >
        <Fade in={processedModal} timeout={500}>
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
                  {modeEditor
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
                value={name || ""}
                onChange={handleChangeProcessedName}
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
                value={quantity || ""}
                onChange={handleChangeProcessedQuantity}
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
                        {selectedRaws.map((iterador) => (
                          <TableRow key={iterador.name}>
                            <TableCell align="center">
                              {iterador.name}
                            </TableCell>
                            <TableCell align="center">
                              {iterador.quantity}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <EliminarCerrar
                                eliminar={true}
                                accion={() => {
                                  deleteRaw(iterador.name);
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
                  accion={handleClickOpenIngredientsModal}
                />
              </div>

              <div
                className="mt-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="mr-4">
                  <EliminarCerrar
                    eliminar={false}
                    accion={handleClickCloseProcessedModal}
                  />
                </div>

                <div>
                  <Guardar accion={handleSubmit} />
                </div>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      <Modal
        open={ingredientsModal}
        onClose={handleClickCloseIngredientsdModal}
      >
        <Fade in={ingredientsModal} timeout={500}>
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
                  value={selectorValue}
                  label="Ingredientes Crudos"
                  autoWidth
                  onChange={handleChangeSelectorValue}
                >
                  <MenuItem value="">
                    <em>Seleccione un Ingrediente</em>
                  </MenuItem>

                  {raws.map((raw) => (
                    <MenuItem value={raw.name} key={raw._id}>
                      {raw.name}
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
                onChange={handleChangeRawPortions}
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
                  accion={handleClickCloseIngredientsdModal}
                />
              </div>

              <Guardar accion={addRaw} />
            </div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default Procesados;
