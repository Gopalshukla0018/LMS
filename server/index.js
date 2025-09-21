import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoutes from "./routes/course.route.js";
import mediaRoute from "./routes/media.routes.js";

dotenv.config({ path: "./.env" });
// call deatebase connection here
connectDB();

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3000;

// default middleware

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

///apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoutes);
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i amm coming from backend",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
