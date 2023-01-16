import React from "react";
import { useContext } from "react";
import { store } from "../components/context/ContextApp";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { cookies } = useContext(store);

  let isLogeado = cookies.get("logeado");
  if (!isLogeado) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
