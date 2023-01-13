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
import AgregarProducto from "../buttons/AgregarProducto";
import Editar from "../buttons/Editar";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Guardar from "../buttons/Guardar";
import AcccionesTabla from "../actions/AcccionesTabla";
import { NombreContexto } from "../context/ContextApp";
import exito from "../alerts/exito";
import Buscador from "../buttons/Buscador";
import "animate.css";
import "../../styles/Crudos.css";

const Crudos = () => {
  const {
    AgregarCrudo,
    ConsultarCrudos,
    productosCrudosCopia,
    EditarCrudo,
    EliminarCrudo,
  } = useContext(NombreContexto);

  const [idcrudo, setIdCrudo] = useState("");
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState(0);
  const [gramosPorcion, setGramosPorcion] = useState(0);
  const [abrirformulario, setAbrirFormulario] = useState(false);
  const [activadorEditor, setActivarEditor] = useState(false);
  const [actualizar, setActualizar] = useState(0);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangePeso = (e) => {
    setPeso(e.target.value);
  };

  const handleChangeGramosPorcion = (e) => {
    setGramosPorcion(e.target.value);
  };

  const handleSubmit = async () => {
    handleAbrirFormulario();
    await AgregarCrudo(nombre, peso, gramosPorcion);
    setActualizar(actualizar + 1);
  };

  const handleAbrirFormulario = () => {
    setAbrirFormulario(!abrirformulario);
  };

  const handleAbrirModoEditor = () => {
    setActivarEditor(true);
  };

  const handleCerrarModoEditor = () => {
    setActivarEditor(false);
  };

  const ConseguirElementos = (id, nombree, pesoo, gramosporcionn) => {
    setIdCrudo(id);
    setNombre(nombree);
    setPeso(pesoo);
    setGramosPorcion(gramosporcionn);
  };

  const handleEditar = async (id, nombree, pesoo, gramosporcion) => {
    if ((await EditarCrudo(id, nombree, pesoo, gramosporcion)) == true) {
      setActualizar(actualizar + 1);
      handleAbrirFormulario();
      exito();
    }
  };

  const handleEliminar = async (id) => {
    if (await EliminarCrudo(id)) {
      exito();
      setActualizar(actualizar + 1);
    }
  };

  const handleLimpiar = () => {
    setNombre("");
    setPeso(null);
    setGramosPorcion(null);
  };

  useEffect(() => {
    ConsultarCrudos();
  }, []);

  useEffect(() => {
    ConsultarCrudos();
  }, [actualizar]);

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
                accion={() => {
                  handleLimpiar();
                  handleCerrarModoEditor();
                  handleAbrirFormulario();
                }}
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
                      <b>Peso [gramos]</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Gramos de Porcion</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cantidad Porciones</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Acciones</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productosCrudosCopia.map((iterador) => (
                    <TableRow key={iterador._id}>
                      <TableCell component="th" align="center">
                        {iterador.nombre}
                      </TableCell>
                      <TableCell component="th" align="center">
                        {iterador.peso}
                      </TableCell>
                      <TableCell component="th" align="center">
                        {iterador.gramosPorcion}
                      </TableCell>
                      <TableCell component="th" align="center">
                        {iterador.cantidadPorciones}
                      </TableCell>
                      <TableCell component="th" align="center">
                        <AcccionesTabla
                          funcionEditar={() => {
                            handleAbrirModoEditor();
                            handleAbrirFormulario();
                            ConseguirElementos(
                              iterador._id,
                              iterador.nombre,
                              iterador.peso,
                              iterador.gramosPorcion
                            );
                          }}
                          funcionEliminar={() => {
                            handleEliminar(iterador._id);
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

      {/* Modal agregar usuario */}

      <Modal
        open={abrirformulario}
        className="animate__animated animate__fadeIn"
        onClose={handleAbrirFormulario}
      >
        <Fade in={abrirformulario} timeout={500}>
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
                  {activadorEditor
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
                onChange={handleChangeNombre}
                defaultValue={nombre}
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
                placeholder="Peso (gramos)"
                type="number"
                variant="standard"
                fullWidth
                onChange={handleChangePeso}
                defaultValue={peso}
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
                onChange={handleChangeGramosPorcion}
                defaultValue={gramosPorcion}
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
                <EliminarCerrar
                  eliminar={false}
                  accion={handleAbrirFormulario}
                />
              </div>
              <div>
                <Guardar
                  accion={
                    activadorEditor
                      ? () => {
                          handleEditar(idcrudo, nombre, peso, gramosPorcion);
                        }
                      : handleSubmit
                  }
                />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Crudos;
