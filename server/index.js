import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoutes from "./routes/course.route.js";
import mediaRoute from "./routes/media.routes.js";
import paymentRouter from "./routes/payment/payment.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import adminRoutes from "./routes/admin/admin.routes.js";

dotenv.config({ path: "./.env" });
// call deatebase connection here
connectDB();

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

// default middleware

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
///apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/progress", courseProgressRoute);

// admin routes
app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/payment", paymentRouter);
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i amm coming from backend",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
