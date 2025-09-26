import express from "express";
import {
  createOrder,
  verifyPayment,
  cashfreeWebhook, // Add if needed
  getCourseDetailWithPurchaseStatus, // Add if needed
  getAllPurchasedCourse, // Add if needed
} from "../../controllers/payment/payment.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);

router.post("/cashfree-webhook", cashfreeWebhook); // No auth, raw body
router.get("/course/:courseId", isAuthenticated, getCourseDetailWithPurchaseStatus);
// router.get("/purchased-courses", isAuthenticated, getAllPurchasedCourse); // Or admin auth

export default router;