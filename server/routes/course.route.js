import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editLecture,
  getCreatorCourses,
  getLectureById,
  getLectures,
  removeLecture,
  toggelPublishUnpublish,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
import { editCourse } from "../controllers/course.controller.js";
import { getCourseById } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
// router
//   .route("/:id")
//   .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
  router
  .route("/:id")
  .put(isAuthenticated, upload.any(), editCourse) // 'upload.single' ko 'upload.any()' se badlein
  .get(isAuthenticated, getCourseById);
router.route("/:id").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getLectures);
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);


router.route("/:courseId").put(isAuthenticated, toggelPublishUnpublish);



export default router;
