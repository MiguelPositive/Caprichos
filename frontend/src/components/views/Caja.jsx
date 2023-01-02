//react
import React from "react";
import { useState } from "react";

//material react ui
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";

//icons
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

const Caja = () => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

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

  const handleLimpiar = () => {
    setNombre("");
    setCedula("");
    setTelefono("");
    setDireccion("");
  };

  return (
    <Box className="contenedor-caja" sx={{ padding: "1rem" }}>
      <Box
        className="contenedor-columnas"
        sx={{
          display: "grid",
          gridTemplateRows: "auto",
          gridTemplateColumns: "0.5fr 1fr",
          columnGap: "1rem",
        }}
      >
        {/* Columna 1 */}
        <Paper
          elevation={4}
          sx={{
            height: "80vh",
            padding: "3rem",
            background: "#DAF7A6",
            borderRadius: "2rem",
          }}
        >
          <Box sx={{ display: "grid", rowGap: "1.5rem", textAlign: "center" }}>
            {/*datos del cliente*/}

            <h3>Datos del Cliente</h3>
            <TextField
              placeholder="Nombre del Cliente"
              variant="standard"
              value={nombre}
              onChange={handleChangeNombre}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="CC del Cliente"
              type="number"
              variant="standard"
              value={cedula}
              onChange={handleChangeCedula}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Telefono del Cliente"
              type="number"
              variant="standard"
              value={telefono}
              onChange={handleChangeTelefono}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Dirección del Cliente"
              variant="standard"
              value={direccion}
              onChange={handleChangeDireccion}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeWorkRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" onClick={handleLimpiar}>
              Limpiar Campos
            </Button>
          </Box>
        </Paper>

        {/* Columna 2 */}
        <Paper
          elevation={4}
          sx={{
            height: "80vh",
            padding: "3rem",
            background: "#DAF7A6",
            borderRadius: "2rem",
          }}
        >
          <h1>jajaj</h1>
        </Paper>
      </Box>
    </Box>
  );
};

export default Caja;
