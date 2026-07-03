const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const userController = require("../controllers/userController");

router.put(
  "/assign-placement/:userId",
  auth,
  authorizeRoles("admin"),
  userController.assignPlacement
);

module.exports = router;