const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const lessonController = require("../controllers/lessonController");

router.post(
  "/create",
  auth,
  authorizeRoles("instructor","admin"),
  lessonController.createLesson
);

module.exports = router;