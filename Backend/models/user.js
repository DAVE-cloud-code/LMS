const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  fullname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student"
  },

  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],

  resetPasswordToken: {
    type: String
  },

  resetPasswordExpire: {
    type: Date
  },
  
  placement: {
    type: String,
    default: "Not Assigned"
},

school: {
    type: String,
    default: "No School Assigned"
}
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);