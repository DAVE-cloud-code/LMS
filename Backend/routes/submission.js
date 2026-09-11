const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");
const uploadAssignment = require("../middlewares/uploadAssignments");

const submissionController = require("../controllers/submissionController");



router.post(
    "/submit/:assignmentId",
    auth,
    authorizeRoles("student"),
    uploadAssignment.single("assignmentFile"),
    submissionController.submitAssignment
);

router.get(
    "/my-submissions",
    auth,
    authorizeRoles("student"),
    submissionController.getMySubmissions
);

router.get(
    "/:submissionId",
    auth,
    authorizeRoles("student"),
    submissionController.getMySubmission
);

router.patch(
    "/grade/:submissionId",
    auth,
    authorizeRoles("instructor", "admin"),
    submissionController.gradeSubmission
);

module.exports = router;