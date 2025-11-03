import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// OAuth imports
import session from "express-session";
import passport from "passport";
import { connectPassport } from "./config/passport.js";

// routes import 
import courseRoutes from "./routes/course.route.js";
import mediaRoute from "./routes/media.routes.js";
import paymentRouter from "./routes/payment/payment.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import adminRoutes from "./routes/admin/admin.routes.js";
import superAdminRoutes from "./routes/superAdmin.route.js";


dotenv.config({ path: "./.env" });
// call deatebase connection here
connectDB();
connectPassport();
const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

// default middleware

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// for OAuth 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is healthy" });
});

/// root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SkillsMittra API! Server is running.",
  });
});

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/progress", courseProgressRoute);

// admin routes
app.use("/api/v1/admin", adminRoutes);

//suprt admin router
app.use("/api/v1/superadmin", superAdminRoutes);

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
