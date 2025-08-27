import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        sucess: false,
        message: "User already exists with this email, please login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      sucess: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reggister",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Incorrect email or password",
      });
    }
    generateToken(res, user, `Welcome back dear ${user.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
