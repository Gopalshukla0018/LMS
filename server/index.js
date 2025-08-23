import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
dotenv.config({});
// call deatebase connection here 
connectDB();


const app= express();

const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})