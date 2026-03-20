const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

const assignmentController = require("../controllers/assignmentController");

router.post(
  "/create",
  auth,
  authorizeRoles("instructor"),
  assignmentController.createAssignment
);

router.get(
  "/course/:courseId",
  auth,
  assignmentController.getCourseAssignments
);

module.exports = router;