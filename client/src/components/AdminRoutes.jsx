import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";

const AdminRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "instructor" || user?.role === "superadmin") {
    return children || <Sidebar />;
  }

  // Otherwise redirect to home
  return <Navigate to="/" replace />;
};

export default AdminRoutes;
