const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    date: {
        type: Date,
        default: Date.now
    },

    records: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            },

            status: {
                type: String,
                enum: ["present", "absent"],
                default: "present"
            }
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);