//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//material react ui
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Fade from "@mui/material/Fade";

//icons
import { FaAppleAlt } from "react-icons/fa";
import NumbersIcon from "@mui/icons-material/Numbers";

// archivos externos
import { store } from "../context/ContextApp";
import AgregarProducto from "../buttons/AgregarProducto";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Guardar from "../buttons/Guardar";
import AcccionesTabla from "../actions/AcccionesTabla";
import Buscador from "../buttons/Buscador";
import "animate.css";
import "../../styles/Crudos.css";

const Crudos = () => {
  const { createRaw, getRaws, updateRaw, deleteRaw, rawsCopy } =
    useContext(store);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [totalWeight, setTotalWeight] = useState(null);
  const [portionWeight, setPortionWeight] = useState(null);

  const [modal, setModal] = useState(false);

  const [modeEditor, setModeEditor] = useState(false);

  const clean = () => {
    setName("");
    setTotalCost(null);
    setTotalWeight(null);
    setPortionWeight(null);
    setModeEditor(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeTotalCost = (e) => {
    setTotalCost(e.target.value);
  };

  const handleChangeTotalWeight = (e) => {
    setTotalWeight(parseInt(e.target.value));
  };

  const handleChangePorsionWeight = (e) => {
    setPortionWeight(parseInt(e.target.value));
  };

  const handleClickOpenModal = () => {
    setModal(!modal);
  };

  const handleClickClose = () => {
    handleClickOpenModal();
    setTimeout(() => {
      clean();
    }, 350);
  };

  const update = (raw) => {
    setModeEditor(true);

    const { _id, name, totalCost, totalWeight, portionWeight } = raw;
    setId(_id);
    setName(name);
    setTotalCost(totalCost);
    setTotalWeight(totalWeight);
    setPortionWeight(portionWeight);
    handleClickOpenModal();
  };

  const handleSubmit = () => {
    const raw = {
      _id: id,
      name,
      totalCost,
      totalWeight,
      portionWeight,
    };

    if (modeEditor) {
      handleClickOpenModal();
      updateRaw(raw);
      clean();
    } else {
      handleClickOpenModal();
      createRaw(raw);

      clean();
    }
  };

  useEffect(() => {
    getRaws();
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
                titulo={"Agregar Crudo"}
                accion={handleClickOpenModal}
              />
            </div>
            <div className="col-sm-8 col-md-9 col-lg-9 col-xl-10 contenedor-buscar">
              <Buscador producto={"crudos"} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="container">
          <Paper
            elevation={9}
            className="table-responsive"
            sx={{ height: "62vh" }}
          >
            <TableContainer>
              <Table aria-label="a dense table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Nombre</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>Costo del Producto</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>Peso [gramos]</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Gramos de Porcion</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cantidad Porciones</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>Costo por porcion</b>
                    </TableCell>

                    <TableCell align="center">
                      <b>Acciones</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rawsCopy.map((raw) => (
                    <TableRow key={raw._id}>
                      <TableCell component="th" align="center">
                        {raw.name}
                      </TableCell>

                      <TableCell component="th" align="center">
                        {raw.totalCost}
                      </TableCell>

                      <TableCell component="th" align="center">
                        {raw.totalWeight}
                      </TableCell>
                      <TableCell component="th" align="center">
                        {raw.portionWeight}
                      </TableCell>
                      <TableCell component="th" align="center">
                        {raw.portionsQuantity}
                      </TableCell>

                      <TableCell component="th" align="center">
                        {raw.portionCost}
                      </TableCell>

                      <TableCell component="th" align="center">
                        <AcccionesTabla
                          funcionEditar={() => {
                            update(raw);
                          }}
                          funcionEliminar={() => {
                            deleteRaw(raw._id);
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
        open={modal}
        className="animate__animated animate__fadeIn"
        onClose={handleClickClose}
      >
        <Fade in={modal} timeout={500}>
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
            }}
          >
            <div className="row">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                <b>
                  {modeEditor
                    ? "Editar Producto Crudo"
                    : "Agregar Producto Crudo"}
                </b>
              </h5>
            </div>

            <div className="row mt-3">
              <TextField
                placeholder="Nombre Crudo"
                variant="standard"
                fullWidth
                onChange={handleChangeName}
                value={name || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaAppleAlt />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-3">
              <TextField
                placeholder="Costo del producto"
                variant="standard"
                fullWidth
                type={"number"}
                onChange={handleChangeTotalCost}
                value={totalCost || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-3">
              <TextField
                placeholder="Peso (gramos)"
                type="number"
                variant="standard"
                fullWidth
                onChange={handleChangeTotalWeight}
                value={totalWeight || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row mt-3">
              <TextField
                placeholder="Gramos por Porcion"
                type="number"
                variant="standard"
                fullWidth
                onChange={handleChangePorsionWeight}
                value={portionWeight || ""}
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
              className="row mt-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="mr-4">
                <EliminarCerrar eliminar={false} accion={handleClickClose} />
              </div>
              <div>
                <Guardar accion={handleSubmit} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Crudos;
