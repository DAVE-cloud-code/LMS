const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const attendanceController = require("../controllers/attendanceController");


// Instructor/Admin marks attendance
router.post(
    "/mark",
    auth,
    authorizeRoles("instructor", "admin"),
    attendanceController.markAttendance
);


// Student views their own attendance
router.get(
    "/my",
    auth,
    attendanceController.getMyAttendance
);


// Instructor views attendance history
router.get(
    "/history",
    auth,
    authorizeRoles("instructor", "admin"),
    attendanceController.getAttendanceHistory
);

module.exports = router;