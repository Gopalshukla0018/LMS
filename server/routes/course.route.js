import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editLecture,
  getAllPublishedCourse,
  getCreatorCourses,
  getLectureById,
  getLectures,
  removeLecture,
  searchCourse,
  toggelPublishUnpublish,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
import { editCourse } from "../controllers/course.controller.js";
import { getCourseById } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/published-course").get(isAuthenticated, getAllPublishedCourse);
router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated,searchCourse)
router.route("/").get(isAuthenticated, getCreatorCourses);

router
  .route("/:id")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
  .get(isAuthenticated, getCourseById);
router.route("/:id").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getLectures);
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId/publish").put(isAuthenticated, toggelPublishUnpublish);

export default router;
