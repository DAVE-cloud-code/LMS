const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const attendanceController = require("../controllers/attendanceController");

// Instructor marks attendance
router.post("/mark", auth, authorizeRoles("instructor", "admin"), attendanceController.markAttendance);

// Get attendance
router.get("/course/:courseId", auth, attendanceController.getCourseAttendance);

router.get("/my", auth, attendanceController.getMyAttendance);

module.exports = router;