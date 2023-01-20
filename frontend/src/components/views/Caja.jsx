//react
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

//material react ui
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Modal } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Fade } from "@mui/material";
import { InputBase } from "@mui/material";

//icons
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

//externos
import { store } from "../context/ContextApp";
import Limpiar from "../buttons/Limpiar";
import EliminarCerrar from "../buttons/EliminarCerrar";
import Guardar from "../buttons/Guardar";
import AgregarProducto from "../buttons/AgregarProducto";
import Agregar from "../buttons/Agregar";
import Detalles from "../buttons/Detalles";
import EditarPreventa_boton from "../buttons/EditarPreventa_boton";
import EliminarPreventa_boton from "../buttons/EliminarPreventa_boton";
import ConfirmarPreventa_boton from "../buttons/ConfirmarPreventa_boton";
import ImprimirFactura from "../buttons/ImprimirFactura";
import logo from "../../img/Logo.png";
import moment from "moment";
import Buscador from "../buttons/Buscador";
import "animate.css";
import "../../styles/Caja.css";

const Caja = () => {
  const {
    cookies,

    getPizzas,
    pizzas,

    createSale,
    getSales,
    salesCopy,

    updateSale,
    deleteSale,
    confirmSale,
  } = useContext(store);

  const [pizzasModal, setPizzasModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [cedula, setCedula] = useState("");
  const [phone, setPhone] = useState("");
  const [direction, SetDirection] = useState("");
  const [tempName, setTempName] = useState("");

  const [products, setProducts] = useState([]);
  const [quantity, setquantity] = useState(1);
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [sendValue, setSendValue] = useState(0);
  const [customerPay, setCustomerPay] = useState(0);
  const [returned, setReturned] = useState(0);

  const [modeEditor, setModeEditor] = useState(false);

  const [printData, setPrintData] = useState([]);

  let position = cookies.get("cargo");
  let date;
  let customerData;
  let transactionData;
  let hour;
  let isSale;

  const cleanCustomerData = () => {
    setCustomerName("");
    setCedula("");
    setPhone("");
    SetDirection("");
  };

  const cleanTransactionData = () => {
    setProducts([]);
    setSendValue("");
    setquantity("");
  };

  const cleanAll = () => {
    cleanCustomerData();
    cleanTransactionData();
    setModeEditor(false);
  };

  const handleClickOpenPizzasModal = () => {
    setPizzasModal(true);
  };

  const handleClickClosePizzasModal = () => {
    setPizzasModal(false);
  };

  const handleClickOpenDetailsModal = () => {
    setDetailsModal(!detailsModal);
  };

  const handleClickOpenConfirmModal = () => {
    if (!printData.isSale) {
      handleClickOpenDetailsModal();
      setConfirmModal(!confirmModal);
    } else {
      alert("la preventa ya fue confirmada");
    }
  };

  const handleChangeName = (e) => {
    setCustomerName(e.target.value);
  };

  const handleChangeCedula = (e) => {
    setCedula(parseInt(e.target.value));
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeDirection = (e) => {
    SetDirection(e.target.value);
  };

  const handleChangeProductQuantity = (e) => {
    setquantity(parseInt(e.target.value));
  };

  const handlechangeTempName = (name) => {
    setTempName(name);
  };

  const handleChangeSendValue = (e) => {
    setSendValue(parseInt(e.target.value));
  };

  const handleChangeCustomerPay = (e) => {
    setCustomerPay(e.target.value);
  };

  const handleChangeReturned = (e) => {
    setReturned(e.target.value);
  };

  const addPizza = (pizza) => {
    const { _id, name, cost, ingredients } = pizza;

    const newProduct = {
      idPizza: _id,
      name,
      quantity: 1,
      unitValue: cost,
      totalValue: cost * 1,
      ingredients,
    };

    setProducts([...products, newProduct]);
  };

  const calculateSubtotal = (name) => {
    let filteredProducts = products.map((product) => {
      if (product.name == name) {
        product.quantity = quantity;
        product.totalValue = product.unitValue * quantity;
      }
      return product;
    });

    setProducts(filteredProducts);
  };

  const updateSubtotal = () => {
    let newSubtotal = 0;
    products.forEach((product) => {
      newSubtotal += product.totalValue;
      return newSubtotal;
    });

    setSubTotal(newSubtotal);
  };

  const updateTotal = () => {
    setTotal(subtotal + sendValue);
  };

  const update = () => {
    const assignValues = () => {
      setModeEditor(true);
      setCustomerName(printData.customerData.name);
      setCedula(printData.customerData.cedula);
      setPhone(printData.customerData.phone);
      SetDirection(printData.customerData.direction);
      setProducts(printData.transactionData.products);
      setSendValue(printData.transactionData.sendValue);
    };

    if (!printData.isSale) {
      assignValues();
    } else {
      if (position == "admin" || position == "visitante") {
        assignValues();
      } else {
        alert("no tiene autorizacion para editar una venta");
      }
    }
  };

  const handleSubmit = () => {
    customerData = {
      name: customerName,
      cedula,
      phone,
      direction,
    };

    transactionData = {
      products,
      subtotal,
      total,
      sendValue,
      customerPay: 0,
      returned: 0,
    };

    date = moment().format("DD/MM/YYYY");
    hour = moment().format("LT");
    isSale = false;

    if (modeEditor) {
      updateSale(printData._id, customerData, transactionData);
      cleanAll();
    } else {
      customerData = {
        name: customerName,
        cedula,
        phone,
        direction,
      };

      transactionData = {
        products,
        subtotal,
        total,
        sendValue,
        customerPay: 0,
        returned: 0,
      };

      date = moment().format("DD/MM/YYYY");
      hour = moment().format("LT");
      isSale = false;

      createSale(date, customerData, transactionData, hour, isSale);

      cleanAll();
    }
  };

  const confirm = () => {
    handleClickOpenConfirmModal();
    handleClickOpenDetailsModal();
    confirmSale(printData._id, customerPay, returned);
  };

  const showInvoice = () => {
    let ventana = window.open();
    ventana.document.write(`
    
    
          <html lang="sp">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Factura de venta</title>
            </head>
            <body>
              <div
                class="contenedor"
                style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Roboto';
          "
              >
                <div
                  class="factura"
                  style="

                  border-radius: 1rem;
                  border: 1px solid gray;
                  padding: 0.5rem;
                  width: 20rem;" >

                  <div style="display: flex; justify-content: center; align-items: center">
                    <img src="${logo}" width="70%" />
                  </div>
                  <div style="width: 100%; text-align: center">
                    ${printData.fecha}
                  </div>
                  <div style="width: 100%; text-align: center">
                    NIT 1098807621-8
                  </div>
                  <div style="width: 100%; text-align: center">
                    Cra. 28 #50 - 40, Sotomayor
                  </div>
                  <div style="width: 100%; text-align: center">
                    Bucaramanga, Santander
                  </div>
                  <div style="width: 100%; text-align: center">300 6550004</div>
                  <div style="width: 100%; text-align: center">
                    Regimen Simplificado
                  </div>
                  <div style="width: 100%; text-align: center">Responsable</div>
                  <div style="width: 100%; text-align: center">
                    Carlos Iván Suarez Perez
                  </div>
                  <div style="width: 100%; text-align: center">
                    Codigo de Factura
                  </div>
                  <div style="width: 100%; text-align: center">
                    ${printData._id}
                  </div>
                  <div style="width: 100%; text-align: center; margin-top: 0.5rem ">
                    Cliente: ${printData.customerData.name}
                  </div>
                  <div style="width: 100%; text-align: center">
                    Cedula: ${printData.customerData.cedula}
                  </div>
                  <div style="width: 100%; text-align: center">
                    Telefono: ${printData.customerData.phone}
                  </div>
                  <div style="width: 100%; text-align: center">
                    Domicilo: ${printData.customerData.direction}
                  </div>
                  `);

    printData.transactionData.products.forEach((product) => {
      ventana.document.write(`
      
      <div style="width: 100%; text-align: center">
      Producto: ${product.name} 
      <br/>
      Cantidad: ${product.quantity} 
      <br/> valor: ${product.totalValue}
    </div>`);
    });

    ventana.document.write(`
              <div style="width: 100%; text-align: center">
                Valor Domicilio: ${printData.transactionData.sendValue}
              </div>
              <div style="width: 100%; text-align: center">
                Total: ${printData.transactionData.totalValue}
              </div>
              <div style="width: 100%; text-align: center">
                Valor Pagado: ${printData.transactionData.customerPay}
              </div>
              <div style="width: 100%; text-align: center">
                Vueltos: ${printData.transactionData.returned}
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
  };

  const deleteProduct = (name) => {
    let substract = 0;
    const filteredProducts = products.filter((product) => {
      if (product.name != name) {
        return product;
      } else if (product.name == name) {
        substract = product.totalValue;
      }
    });

    setProducts(filteredProducts);
    setSubTotal(subtotal - substract);
  };

  const eraseSale = () => {
    if (printData.isSale) {
      if (position == "admin" || position == "visitante") {
        handleClickOpenDetailsModal();
        deleteSale(printData);
        cleanAll();
      }
    } else {
      handleClickOpenDetailsModal();
      deleteSale(printData);
      cleanAll();
    }
  };

  useEffect(() => {
    getPizzas();
    getSales();
  }, []);

  useEffect(() => {
    calculateSubtotal(tempName);
  }, [quantity]);

  useEffect(() => {
    updateSubtotal();
  }, [products]);

  useEffect(() => {
    updateTotal();
  }, [subtotal, sendValue]);

  useEffect(() => {
    if (!confirmModal && printData != "") {
      handleClickOpenDetailsModal();
    }
  }, [confirmModal]);

  useEffect(() => {
    if (customerPay != "") {
      setReturned(customerPay - printData.transactionData.total);
    }
  }, [customerPay]);

  return (
    <Box
      className="contenedor-caja container animate__animated animate__fadeIn"
      sx={{
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="row datos-cliente-venta" style={{ width: "100%" }}>
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 datos-cliente">
          <Paper
            elevation={4}
            sx={{
              height: "23rem",
              padding: "1rem 2rem 1.5rem 2rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ width: "100%", textAlign: "center" }}>
              Datos del Cliente
            </h3>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Nombre del Cliente"
                variant="standard"
                value={customerName || ""}
                onChange={handleChangeName}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="CC del Cliente"
                type="number"
                variant="standard"
                value={cedula || ""}
                onChange={handleChangeCedula}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Telefono del Cliente"
                type="number"
                variant="standard"
                value={phone || ""}
                onChange={handleChangePhone}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-2" style={{ width: "100%" }}>
              <TextField
                placeholder="Dirección del Cliente"
                variant="standard"
                value={direction || ""}
                onChange={handleChangeDirection}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeWorkRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div
              className="mt-2"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Limpiar accion={cleanCustomerData} />
            </div>
          </Paper>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 datos-venta">
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              height: "23rem",
              padding: "1rem",
              borderRadius: "1rem",
            }}
            className="container table-responsive"
          >
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6 btn-agregar-pizza">
                <AgregarProducto
                  titulo={"Agregar Pizza"}
                  accion={handleClickOpenPizzasModal}
                />
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 btn-buscarventa-pizza">
                <Buscador producto={"ventas"} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-lg-12 ">
                <Paper
                  elevation={6}
                  className="table-responsive"
                  sx={{ height: "9.5rem" }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <b>Nombre</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Cantidad</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Valor Unidad</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Valor Total</b>
                          </TableCell>
                          <TableCell align="center">
                            <b>Eliminar</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.idPizza}>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">
                              <TextField
                                variant="standard"
                                type="number"
                                value={product.quantity || ""}
                                onChange={(e) => {
                                  handleChangeProductQuantity(e);
                                  handlechangeTempName(product.name);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {product.unitValue}
                            </TableCell>

                            <TableCell align="center">
                              {product.totalValue}
                            </TableCell>

                            <TableCell
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <EliminarCerrar
                                eliminar={true}
                                accion={() => {
                                  deleteProduct(product.name);
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
              className="row mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="col-sm-6 col-md-6 col-lg-6 subtotal">
                <div
                  style={{
                    borderRadius: "3rem",
                    background: "#D7D7D7",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <b>Subtotal: </b>
                  {subtotal || ""}
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 total">
                <div
                  style={{
                    borderRadius: "3rem",
                    background: "#D7D7D7",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <b>Total: </b>
                  {total || ""}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6 col-md-6 col-lg-6 valor-domicilio">
                <TextField
                  variant="outlined"
                  size="small"
                  label="valor del domicilio"
                  type="number"
                  value={sendValue || ""}
                  onChange={handleChangeSendValue}
                />
              </div>
              <div
                className="col-sm-6 col-md-6 col-lg-6 acciones-venta"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="mr-4">
                  <Limpiar accion={cleanTransactionData} />
                </div>
                <div>
                  <Guardar accion={handleSubmit} />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="row mt-5" style={{ width: "100%" }}>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <Paper
            elevation={6}
            className="table-responsive"
            sx={{ borderRadius: "1rem", marginBottom: "4rem", height: "20rem" }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Fecha</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Hora</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cliente</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cedula</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Valor Venta</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Opciones</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesCopy.map((sale) => (
                    <TableRow key={sale._id}>
                      <TableCell align="center"> {sale.date}</TableCell>
                      <TableCell align="center">{sale.hour}</TableCell>
                      <TableCell align="center">
                        {sale.customerData.name}
                      </TableCell>

                      <TableCell align="center">
                        {sale.customerData.cedula}
                      </TableCell>
                      <TableCell align="center">
                        {sale.transactionData.total}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Detalles
                          accion={() => {
                            setPrintData(sale);
                            handleClickOpenDetailsModal();
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
            elevation={6}
            className="container modal-sinfocus"
            style={{
              position: "absolute",
              width: "20rem",
              padding: "0rem 1rem 1rem 1rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              style={{
                width: "2rem",
                position: "relative",
                top: "0rem",
                left: "17rem",
              }}
            >
              <EliminarCerrar
                eliminar={false}
                accion={handleClickClosePizzasModal}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h5 style={{ textAlign: "center" }}>Agregar Pizza</h5>
              </div>
            </div>
            <div
              className="row mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "1rem",
              }}
            >
              <Paper
                elevation={6}
                sx={{ width: "15rem", height: "10rem" }}
                className="table-responsive"
              >
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {pizzas.map((pizza) => (
                        <TableRow key={pizza._id}>
                          <TableCell align="center">{pizza.name}</TableCell>
                          <TableCell align="center">
                            <Agregar
                              accion={() => {
                                addPizza(pizza);
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
          </Paper>
        </Fade>
      </Modal>

      <Modal
        open={detailsModal}
        onClose={handleClickOpenDetailsModal}
        className="animate__animated animate__fadeIn"
      >
        <Fade in={detailsModal} timeout={500}>
          <Paper
            elevation={6}
            className="contenedor-detalles modal-sinfocus container"
            sx={{
              width: "24rem",
              height: "11rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div>
                <EliminarCerrar
                  eliminar={false}
                  accion={() => {
                    handleClickOpenDetailsModal();
                    cleanAll();
                  }}
                />
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EditarPreventa_boton
                  accion={() => {
                    handleClickOpenDetailsModal();
                    update();
                  }}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <EliminarPreventa_boton accion={eraseSale} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <ConfirmarPreventa_boton accion={handleClickOpenConfirmModal} />
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 detalles">
                <ImprimirFactura accion={showInvoice} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      <Modal
        open={confirmModal}
        className="animate__animated animate__fadeIn"
        onClose={handleClickOpenConfirmModal}
      >
        <Fade in={confirmModal} timeout={500}>
          <Paper
            elevation={6}
            className="container modal-sinfocus"
            sx={{
              width: "20rem",
              height: "20rem",
              position: "absolute",
              padding: "2.5rem",
              paddingTop: "0.3rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div className="row mt-3">
              <h5 style={{ width: "100%", textAlign: "center" }}>
                Pago de la compra
              </h5>
            </div>

            <div className="row mt-4">
              <div
                className="col-sm-12 col-md-12 col-lg-12"
                style={{
                  height: "20%",
                  borderRadius: "2rem",
                  border: "1px solid gray",
                  padding: "0.1rem 0.4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center,",
                }}
              >
                <h6 style={{ width: "100%", textAlign: "center" }}>
                  Total a pagar:
                  {printData != "" ? ` ${printData.transactionData.total}` : ""}
                </h6>
              </div>
            </div>

            <div className="row mt-4">
              <div
                className="col-sm-12 col-md-12 col-lg-12"
                style={{
                  height: "20%",
                  borderRadius: "2rem",
                  border: "1px solid gray",
                  padding: "0.1rem 0.4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center,",
                }}
              >
                <div>
                  <h6
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    Pago en efectivo
                    <InputBase
                      type="number"
                      size="small"
                      onChange={handleChangeCustomerPay}
                    />
                  </h6>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div
                className="col-sm-12 col-md-12 col-lg-12"
                style={{
                  height: "20%",
                  borderRadius: "2rem",
                  border: "1px solid gray",
                  padding: "0.1rem 0.4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center,",
                }}
              >
                <h6 style={{ width: "100%", textAlign: "center" }}>
                  Vueltos: {returned}
                </h6>
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
              <div className="mr-4">
                <EliminarCerrar
                  eliminar={false}
                  accion={handleClickOpenConfirmModal}
                />
              </div>
              <div>
                <Guardar accion={confirm} />
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Caja;
