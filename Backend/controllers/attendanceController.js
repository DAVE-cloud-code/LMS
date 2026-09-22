const Attendance = require("../models/attendance");

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    const attendance = await Attendance.create({
      instructor: req.user.id,
      date: new Date(),
      records
    });

    res.status(201).json(attendance);

  } catch (error) {
    console.error("MARK ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


// Get attendance records
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("records.student", "fullname email")
      .sort({ createdAt: -1 });

    res.json(attendance);

  } catch (error) {
    console.error("GET ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


// Get student's attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      "records.student": req.user.id
    })
      .populate("records.student", "fullname email")
      .sort({ date: -1 });

    const formatted = attendance.map(item => {
      const studentRecord = item.records.find(
        record =>
          record.student &&
          record.student._id.toString() === req.user.id.toString()
      );

      return {
        _id: item._id,
        date: item.date,
        status: studentRecord ? studentRecord.status : "unknown"
      };
    });

    res.json(formatted);

  } catch (error) {
    console.error("GET MY ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


// Get attendance history for instructor
exports.getAttendanceHistory = async (req, res) => {
    try {
        console.log("===== ATTENDANCE HISTORY =====");
        console.log("Instructor ID:", req.user.id);

        const history = await Attendance.find({
            instructor: req.user.id
        })
            .populate("records.student", "fullname email")
            .sort({ date: -1 });

        console.log("Attendance records found:", history.length);
        console.log("History:", JSON.stringify(history, null, 2));

        res.json(history);

    } catch (error) {
        console.error("GET ATTENDANCE HISTORY ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};
