//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

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

//archivos externos
import { store } from "../context/ContextApp";
import "../../styles/Lista.css";

const Lista = () => {
  const { abrirMenu, handleOpenMenu } = useContext(store);

  const [subMenu, setSubMenu] = useState(null);

  let temp = Boolean(subMenu);

  const AbrirSubMenu = (e) => {
    setSubMenu(e.currentTarget);
  };

  const CerrarSubMenu = () => {
    setSubMenu(null);
  };

  const open = () => {
    if (!abrirMenu) {
      CerrarSubMenu();
      temp = Boolean(subMenu);
    }
  };

  useEffect(() => {
    open();
  }, [abrirMenu]);

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

          <NavLink to="/usuarios">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <SquareFootRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Administrar</TextoOpciones>
                <TextoOpciones>Usuarios</TextoOpciones>
              </ListItemText>
            </ListItem>
          </NavLink>

          <NavLink to="/usuarios">
            <ListItem button onClick={handleOpenMenu}>
              <ListItemIcon>
                <SquareFootRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                <TextoOpciones>Administrar</TextoOpciones>
                <TextoOpciones>Caja</TextoOpciones>
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

          <ListItem button onClick={AbrirSubMenu}>
            <ListItemIcon>
              <SquareFootRoundedIcon />
            </ListItemIcon>
            <ListItemText>
              <TextoOpciones>Inventario</TextoOpciones>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

      {/* Sub menu */}

      <Menu open={temp} onClose={CerrarSubMenu} anchorEl={subMenu}>
        <MenuItem>
          <NavLink to="/crudos">
            <ListItem
              button
              onClick={() => {
                CerrarSubMenu();
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
                CerrarSubMenu();
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
