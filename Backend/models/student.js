const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    fullname: {
        type: String,
        required: true
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);