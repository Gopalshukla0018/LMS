import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import { getAllUsersData } from "../controllers/superAdmin.controller.js";

const router = express.Router();

router
  .route("/superadmin-dashboard")
  .get(isAuthenticated, isSuperAdmin, getAllUsersData);

export default router;
