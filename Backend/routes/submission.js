const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

const submissionController = require("../controllers/submissionController");

router.post(
  "/submit",
  auth,
  authorizeRoles("student"),
  submissionController.submitAssignment
);

router.put(
  "/grade/:submissionId",
  auth,
  authorizeRoles("instructor"),
  submissionController.gradeSubmission
);

module.exports = router;