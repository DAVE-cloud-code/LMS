const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const courseController = require("../controllers/courseController");

router.post(
  "/create",
  auth,
  authorizeRoles("instructor", "admin"),
  courseController.createCourse
);

router.get("/", auth, courseController.getAllCourses);

router.get(
  "/my-courses",
  auth,
  authorizeRoles("student"),
  courseController.getMyCourses
);

router.post(
  "/enroll/:courseId",
  auth,
  authorizeRoles("student"),
  courseController.enrollCourse
);

router.get("/:courseId", auth, courseController.getCourse);

router.put(
  "/:courseId",
  auth,
  authorizeRoles("instructor", "admin"),
  courseController.updateCourse
);

router.delete(
  "/:courseId",
  auth,
  authorizeRoles("admin"),
  courseController.deleteCourse
);

module.exports = router;