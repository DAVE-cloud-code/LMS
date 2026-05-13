const express = require("express");

const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const studentController = require("../controllers/studentController");

router.post("/add", auth, studentController.addStudent);

router.get("/", auth, studentController.getStudents);

router.delete("/:studentId", auth, studentController.deleteStudent);

module.exports = router;