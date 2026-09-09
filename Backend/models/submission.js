const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fileUrl: {
        type: String,
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    submittedAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["submitted", "graded"],
        default: "submitted"
    },

    grade: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },

    feedback: {
        type: String,
        default: ""
    },

    gradedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Submission", submissionSchema);