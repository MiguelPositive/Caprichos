//react
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

//mui
import { Paper } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Modal } from "@mui/material";
import { Fade } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

//iconos
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BadgeIcon from "@mui/icons-material/Badge";

//externos
import AgregarProducto from "../buttons/AgregarProducto";
import Buscador from "../buttons/Buscador";
import EliminarCerrar from "../buttons/EliminarCerrar";
import AcccionesTabla from "../actions/AcccionesTabla";
import { store } from "../context/ContextApp";
import Guardar from "../buttons/Guardar";

import "animate.css";
import "../../styles/Crudos.css";

const Usuarios = () => {
  const {
    ConsultarUsuarios,
    usuariosCopia,
    AgregarUsuario,
    EditarUsuario,
    EliminarUsuario,
  } = useContext(store);

  const [modalUsuarios, setModalUsuarios] = useState(false);

  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargo, setCargo] = useState("");

  const [editor, setEditor] = useState(false);

  const [idUsuario, setIdUsuario] = useState("");

  //funciones abrir y cerrar
  const AbrirModalUsuarios = () => {
    setModalUsuarios(true);
  };

  const CerrarModalUsuarios = () => {
    setModalUsuarios(false);
  };

  //funciones de cambio

  const handlerChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handlerChangeContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const handlerChangeCargo = (e) => {
    setCargo(e.target.value);
  };

  // funcion limpiar

  const Limpiar = () => {
    setIdUsuario("");
    setUsuario("");
    setContrasena("");
    setCargo("");
  };

  //use effecs

  useEffect(() => {
    ConsultarUsuarios();
  }, []);
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="container animate__animated animate__fadeIn"
    >
      <div className="row mt-4">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <AgregarProducto
            titulo={"Agregar Usuario"}
            accion={() => {
              Limpiar();
              setEditor(false);
              AbrirModalUsuarios();
            }}
          />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <Buscador producto={"usuarios"} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Paper elevation={6} className="table-responsive">
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <b>Usuario</b>{" "}
                        </TableCell>
                        <TableCell align="center">
                          <b>Contraseña</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Cargo</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>Acciones</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usuariosCopia.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell align="center">{user.usuario} </TableCell>
                          <TableCell align="center">
                            {user.contrasena}
                          </TableCell>
                          <TableCell align="center">{user.cargo}</TableCell>
                          <TableCell align="center">
                            <AcccionesTabla
                              funcionEditar={() => {
                                setIdUsuario(user._id);
                                setUsuario(user.usuario);
                                setContrasena(user.contrasena);
                                setCargo(user.contrasena);
                                setEditor(true);
                                AbrirModalUsuarios();
                              }}
                              funcionEliminar={() => {
                                EliminarUsuario(user._id);
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
      </div>

      {/* Modal agregar - editar usuario */}

      <Modal
        open={modalUsuarios}
        onClose={CerrarModalUsuarios}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={modalUsuarios} timeout={500}>
          <Paper
            elevation={6}
            className="container modal-sinfocus"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "20rem",
              height: "20rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
            }}
          >
            <div
              className="row mt-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h5 style={{ textAlign: "center" }}>
                {editor ? "Editar Usuario" : "Agregar Usuario"}
              </h5>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <TextField
                  variant="standard"
                  placeholder="Nombre de usuario"
                  fullWidth
                  value={usuario || ""}
                  onChange={handlerChangeUsuario}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <TextField
                  variant="standard"
                  placeholder="Contraseña"
                  fullWidth
                  value={contrasena || ""}
                  onChange={handlerChangeContrasena}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setMostrarContrasena(!mostrarContrasena);
                          }}
                        >
                          {mostrarContrasena ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <TextField
                  variant="standard"
                  placeholder="Cargo"
                  fullWidth
                  value={cargo || ""}
                  onChange={handlerChangeCargo}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div
              className="row mt-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="mr-4">
                <EliminarCerrar
                  eliminar={false}
                  accion={() => {
                    Limpiar();
                    CerrarModalUsuarios();
                  }}
                />
              </div>
              <div>
                <Guardar
                  accion={
                    editor
                      ? () => {
                          CerrarModalUsuarios();
                          EditarUsuario(idUsuario, usuario, contrasena, cargo);
                          setEditor(false);
                        }
                      : () => {
                          CerrarModalUsuarios();
                          AgregarUsuario(usuario, contrasena, cargo);
                        }
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

export default Usuarios;
