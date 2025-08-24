import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
dotenv.config({ path: "./.env" });
// call deatebase connection here
connectDB();

const app = express();

const port = process.env.PORT || 3000;
console.log("PORT from code:", port);

///apis
app.use("/api/v2/user", userRoute);
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i amm coming from backend",
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
