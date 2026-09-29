const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);

router.post(
    "/reset-password/:token",
    authController.resetPassword
);


// =========================
// ADMIN: CREATE INSTRUCTOR
// =========================

router.post(
    "/create-instructor",
    auth,
    authorizeRoles("admin"),
    authController.createInstructor
);


// =========================
// ADMIN: GET INSTRUCTORS
// =========================

router.get(
    "/instructors",
    auth,
    authorizeRoles("admin"),
    authController.getAllInstructors
);


// =========================
// ADMIN: GET ALL USERS
// =========================

router.get(
    "/users",
    auth,
    authorizeRoles("admin"),
    authController.getAllUsers
);


// =========================
// ADMIN: DELETE USER
// =========================

router.delete(
    "/users/:id",
    auth,
    authorizeRoles("admin"),
    authController.deleteUser
);


// =========================
// USER: GET PROFILE
// =========================

router.get(
    "/profile",
    auth,
    authController.getProfile
);


module.exports = router;
