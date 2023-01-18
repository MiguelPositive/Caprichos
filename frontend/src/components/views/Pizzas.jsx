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
    getProcessed,
    processed,

    createPizza,
    getPizzas,
    updatePizza,
    deletePizza,
    pizzasCopy,
  } = useContext(store);

  const [pizzasModal, setpPizzasModal] = useState(false);
  const [ingredientsModal, setIngredientsModal] = useState(false);

  const [selectorValue, setSelectorValue] = useState("");
  const [ingredientPortions, setIngredientPortions] = useState(null);

  const [idColapse, setIdColapse] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [modeEditor, setModeEditor] = useState(false);

  const Clean = () => {
    setIdColapse("");
    setId("");
    setName("");
    setCost(null);
    setSelectedIngredients([]);
    setModeEditor(false);
  };

  const handleClickOpenPizzasModal = () => {
    setpPizzasModal(true);
  };

  const handleClickClosePizzasModal = () => {
    setpPizzasModal(false);

    setTimeout(() => {
      Clean();
    }, 250);
  };

  const handleClickOpenIngredientsModal = () => {
    setIngredientsModal(!ingredientsModal);
  };

  const handleClickCloseIngredientsModal = () => {
    setIngredientsModal(false);
    setTimeout(() => {
      Clean();
    }, 250);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(parseInt(e.target.value));
  };

  const handleChangeSelectorValue = (e) => {
    setSelectorValue(e.target.value);
  };

  const handleChangeIngredientPortions = (e) => {
    setIngredientPortions(parseInt(e.target.value));
  };

  const handleChangeIdCollapse = (id) => {
    if (idColapse == id) {
      setIdColapse("");
    } else {
      setIdColapse(id);
    }
  };

  const addIngredient = () => {
    const newIngredient = {
      name: selectorValue,
      quantity: ingredientPortions,
    };

    setSelectedIngredients([...selectedIngredients, newIngredient]);
  };

  const update = (pizza) => {
    const { _id, name, cost, ingredients } = pizza;
    setModeEditor(true);
    setId(_id);
    setName(name);
    setCost(cost);
    setSelectedIngredients(ingredients);
    handleClickOpenPizzasModal();
  };

  const handleSubmit = () => {
    const pizza = {
      _id: id,
      name,
      cost,
      selectedIngredients,
    };
    if (modeEditor) {
      updatePizza(pizza);
      handleClickClosePizzasModal();
    } else {
      createPizza(pizza);
      handleClickClosePizzasModal();
    }
  };

  const deleteIngredient = (nombre) => {
    const temporal = selectedIngredients.filter((iterador) => {
      if (nombre != iterador.nombre) {
        return iterador;
      }
    });

    setSelectedIngredients(temporal);
  };

  useEffect(() => {
    getProcessed();
    getPizzas();
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
                accion={handleClickOpenPizzasModal}
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
                  {pizzasCopy.map((pizza) => (
                    <TableRow key={pizza._id}>
                      <TableCell align="center">
                        {pizza.name}

                        <IconButton
                          onClick={() => {
                            handleChangeIdCollapse(pizza._id);
                          }}
                        >
                          {idColapse == pizza._id ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowUpIcon />
                          )}
                        </IconButton>

                        <Collapse
                          in={idColapse == pizza._id}
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
                                      {pizza.ingredients.map((ingredient) => (
                                        <TableRow key={ingredient.name}>
                                          <TableCell align="center">
                                            {ingredient.name}
                                          </TableCell>

                                          <TableCell align="center">
                                            {ingredient.quantity}
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

                      <TableCell align="center">{pizza.cost}</TableCell>

                      <TableCell align="center">
                        <AcccionesTabla
                          funcionEliminar={() => {
                            deletePizza(pizza._id);
                          }}
                          funcionEditar={() => {
                            update(pizza);
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

      <Modal
        open={pizzasModal}
        onClose={handleClickClosePizzasModal}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={pizzasModal} timeout={500}>
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
                <b>{modeEditor ? "Editar Pizza" : "Agregar Pizza"}</b>
              </h5>
            </div>

            <div className="row" style={{ width: "100%" }}>
              <TextField
                placeholder="Nombre pizza"
                variant="standard"
                fullWidth
                onChange={handleChangeName}
                value={name || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPizzaRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-3" style={{ width: "100%" }}>
              <TextField
                placeholder="Precio Pizza"
                variant="standard"
                fullWidth
                type="number"
                onChange={handleChangeCost}
                value={cost || ""}
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
                      {selectedIngredients.map((ingredient) => (
                        <TableRow key={ingredient.name}>
                          <TableCell align="center">
                            {ingredient.name}
                          </TableCell>
                          <TableCell align="center">
                            {ingredient.quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <EliminarCerrar
                              eliminar={true}
                              accion={() => {
                                deleteIngredient(ingredient.name);
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
                accion={handleClickOpenIngredientsModal}
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
                  accion={handleClickClosePizzasModal}
                />
              </div>

              <div>
                <Guardar accion={handleSubmit} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      <Modal open={ingredientsModal} onClose={handleClickCloseIngredientsModal}>
        <Fade in={ingredientsModal} timeout={500}>
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
                  value={selectorValue || ""}
                  label="Ingredientes Procesados"
                  className="modal-sinfocus"
                  autoWidth
                  onChange={handleChangeSelectorValue}
                >
                  <MenuItem value="">
                    <em>Seleccione un Ingrediente</em>
                  </MenuItem>
                  {processed.map((_processed) => (
                    <MenuItem key={_processed._id} value={_processed.name}>
                      {_processed.name}
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
                onChange={handleChangeIngredientPortions}
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
                  accion={handleClickOpenIngredientsModal}
                />
              </div>
              <div>
                <Guardar accion={addIngredient} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Pizzas;
