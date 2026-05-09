const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

const controller = require("../controllers/classSessionController");



// ✅ Instructor starts class
router.post(
    "/start",
    auth,
    authorizeRoles("instructor"),
    controller.startClass
);


// ✅ Student marks attendance
router.post(
    "/mark",
    auth,
    authorizeRoles("student"),
    controller.markAttendance
);


// ✅ Instructor ends class
router.put(
    "/end/:sessionId",
    auth,
    authorizeRoles("instructor"),
    controller.endClass
);


// ✅ Instructor gets sessions
router.get(
    "/instructor",
    auth,
    authorizeRoles("instructor"),
    controller.getInstructorSessions
);


// ✅ Student attendance history
router.get(
    "/student",
    auth,
    authorizeRoles("student"),
    controller.getStudentAttendance
);

module.exports = router;