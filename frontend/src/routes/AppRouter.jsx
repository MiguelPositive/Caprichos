import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import DashboardRouter from "./DashboardRouter";
import { useContext } from "react";
import { store } from "../components/context/ContextApp";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  const { cookies } = useContext(store);

  let logeado = cookies.get("logeado");
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path={logeado ? "*" : "/"}
            element={logeado ? <DashboardRouter /> : <Login />}
          />

          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<DashboardRouter />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
