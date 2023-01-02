//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";

//archivos externos
import { NombreContexto } from "../context/ContextApp";

//material react ui
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Drawer } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";

//iconos
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import TurnLeftRoundedIcon from "@mui/icons-material/TurnLeftRounded";

const Lista = () => {
  const { abrirMenu, handleOpenMenu } = useContext(NombreContexto);
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleAbrirSubMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChangeCerrarSubMenu = () => {
    setAnchorEl(null);
  };

  const TextoOpciones = styled(Typography)({
    color: "gray",
    textDecoration: "none",
    textDecorationLine: "none",
    fontWeight: "bold",
  });

  return (
    <div>
      <Drawer
        open={abrirMenu}
        onClose={handleOpenMenu}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ flexGrow: 1 }}
      >
        <List component="nav">
          <NavLink to="/inicio">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Incio</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>

          <NavLink to="/caja">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <PointOfSaleRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Caja</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>

          <NavLink to="/pizzas">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <SellRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Pizzas</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>

          <ListItem button onClick={handleAbrirSubMenu}>
            <ListItemIcon>
              <SquareFootRoundedIcon />
            </ListItemIcon>
            <ListItemText>
              <TextoOpciones>Inventario</TextoOpciones>
            </ListItemText>
          </ListItem>

          <NavLink to="/usuarios">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <SquareFootRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Usuarios</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>

      <Menu
        open={open}
        onClose={handleChangeCerrarSubMenu}
        sx={{ marginLeft: "9.1rem", marginTop: "-13rem" }}
      >
        <TurnLeftRoundedIcon style={{ fontSize: "2rem" }} />
        <MenuItem>
          <NavLink to="/crudos">
            <ListItem
              button
              onClick={() => {
                handleChangeCerrarSubMenu();
                handleOpenMenu();
              }}
            >
              <ListItemIcon>
                <SquareFootRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Crudos</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/procesados">
            <ListItem
              button
              onClick={() => {
                handleChangeCerrarSubMenu();
                handleOpenMenu();
              }}
            >
              <ListItemIcon>
                <SquareFootRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Procesados</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Lista;
