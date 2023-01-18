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
import { store } from "../context/ContextApp";
import AgregarProducto from "../buttons/AgregarProducto";
import Buscador from "../buttons/Buscador";
import EliminarCerrar from "../buttons/EliminarCerrar";
import AcccionesTabla from "../actions/AcccionesTabla";
import Guardar from "../buttons/Guardar";

import "animate.css";
import "../../styles/Crudos.css";

const Usuarios = () => {
  const { createUser, getUsers, updateUser, deleteUser, usersCopy } =
    useContext(store);

  const [modal, setModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  const [editorMode, setEditorMode] = useState(false);

  const clean = () => {
    setId("");
    setUser("");
    setPassword("");
    setPosition("");
  };

  const handleClickOpenModal = () => {
    setModal(!modal);
  };

  const handleClickCloseModal = () => {
    setModal(false);
    clean();
  };

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePosition = (e) => {
    setPosition(e.target.value);
  };

  const update = (data) => {
    const { _id, user, password, position } = data;

    setId(_id);
    setUser(user);
    setPassword(password);
    setPosition(position);
    setEditorMode(true);
    handleClickOpenModal();
  };

  const handleSubmit = () => {
    const newUser = {
      _id: id,
      user,
      password,
      position,
    };
    if (editorMode) {
      updateUser(newUser);
      handleClickCloseModal();
      clean();
    } else {
      createUser(user);
      handleClickCloseModal();
    }
  };

  useEffect(() => {
    getUsers();
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
              clean();
              setEditorMode(false);
              handleClickOpenModal();
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
                      {usersCopy.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell align="center">{user.user} </TableCell>
                          <TableCell align="center">{user.password}</TableCell>
                          <TableCell align="center">{user.position}</TableCell>
                          <TableCell align="center">
                            <AcccionesTabla
                              funcionEditar={() => {
                                update(user);
                              }}
                              funcionEliminar={() => {
                                deleteUser(user._id);
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

      <Modal
        open={modal}
        onClose={handleClickCloseModal}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={modal} timeout={500}>
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
                {editorMode ? "Editar Usuario" : "Agregar Usuario"}
              </h5>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <TextField
                  variant="standard"
                  placeholder="Nombre de usuario"
                  fullWidth
                  value={user || ""}
                  onChange={handleChangeUser}
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
                  value={password || ""}
                  onChange={handleChangePassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? (
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
                  value={position || ""}
                  onChange={handleChangePosition}
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
                  accion={handleClickCloseModal}
                />
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

export default Usuarios;
