import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar"; // Sidebar ko yahan import karein

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  if (user && user.role === "instructor") {
    return <Sidebar />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default AdminRoutes;
