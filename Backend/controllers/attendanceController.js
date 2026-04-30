const Attendance = require("../models/attendance");
const Course = require("../models/course");

// ✅ Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { courseId, records } = req.body;

    const attendance = await Attendance.create({
      course: courseId,
      date: new Date(),
      records
    });

    res.status(201).json(attendance);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get attendance for a course
exports.getCourseAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      course: req.params.courseId
    }).populate("records.student", "fullname email");

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.user.id
    }).populate("course", "title");

    res.json(attendance);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};