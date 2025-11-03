import express from "express";
import {
  register,
  login,
  getUserProfile,
  logout,
  updateProfile,
  
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);


router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto") ,   updateProfile);


router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CORS_ORIGIN}/login`, 
    session: false, 
  }),
  (req, res) => {
  
    const user = req.user;

   
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

  
    const cookieOptions = {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };


    res
      .cookie("token", token, cookieOptions)
      .redirect(process.env.CORS_ORIGIN); 
  }
);


export default router;
