import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  getCreatorCourses,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
import { editCourse } from "../controllers/course.controller.js";
import { getCourseById } from "../controllers/course.controller.js";
const router = express.Router();


router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:id").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:id").get(isAuthenticated, getCourseById);
export default router;
