const mongoose = require("mongoose");

const classSessionSchema = new mongoose.Schema(
{
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    attendanceCode: {
        type: String,
        required: true
    },

    tutorPresent: {
        type: Boolean,
        default: true
    },

    studentsPresent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    isActive: {
        type: Boolean,
        default: true
    }

},
{ timestamps: true }
);

module.exports = mongoose.model(
    "ClassSession",
    classSessionSchema
);