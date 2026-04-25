const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  records: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      status: {
        type: String,
        enum: ["present", "absent"],
        default: "absent"
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);