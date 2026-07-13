const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const assignmentController = require("../controllers/assignmentController");


// ==============================
// Instructor Routes
// ==============================

// Create Assignment
router.post(
    "/create",
    auth,
    authorizeRoles("instructor"),
    assignmentController.createAssignment
);

// Get Logged-in Instructor's Assignments
router.get(
    "/my-assignments",
    auth,
    authorizeRoles("instructor"),
    assignmentController.getMyAssignments
);

// Delete Assignment
router.delete(
    "/:id",
    auth,
    authorizeRoles("instructor"),
    assignmentController.deleteAssignment
);


// ==============================
// Student Route
// ==============================

// Get All Available Assignments
router.get(
    "/all",
    auth,
    assignmentController.getAssignments
);

module.exports = router;