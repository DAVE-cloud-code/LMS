const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post(
    "/create-instructor",
    auth,
    authorizeRoles("admin"),
    authController.createInstructor
);
// Admin gets instructors
router.get(
    "/instructors",
    auth,
    authorizeRoles("admin"),
    authController.getAllInstructors
);
router.get(
  "/users",
  auth,
  authorizeRoles("admin"),
  authController.getAllUsers
);

router.get(
    "/profile",
    auth,
    authController.getProfile
);

module.exports = router;