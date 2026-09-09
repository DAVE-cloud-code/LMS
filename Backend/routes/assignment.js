const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const assignmentController = require("../controllers/assignmentController");



router.post(
    "/create",
    auth,
    authorizeRoles("instructor", "admin"),
    assignmentController.createAssignment
);

router.get(
    "/all",
    auth,
    authorizeRoles("student"),
    assignmentController.getAssignments
);

router.get(
    "/my-assignments",
    auth,
    authorizeRoles("instructor", "admin"),
    assignmentController.getMyAssignments
);

// Must be before /:id so the submissions route is matched correctly.
router.get(
    "/:assignmentId/submissions",
    auth,
    authorizeRoles("instructor", "admin"),
    assignmentController.getAssignmentSubmissions
);

router.get(
    "/:id",
    auth,
    authorizeRoles("student"),
    assignmentController.getAssignment
);

router.delete(
    "/:id",
    auth,
    authorizeRoles("instructor", "admin"),
    assignmentController.deleteAssignment
);
module.exports = router;