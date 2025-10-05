import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SuperAdminRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (  user?.role === "superadmin") {
    return children;
  }

  return <Navigate to="/"  />;
};

export default SuperAdminRoutes;
