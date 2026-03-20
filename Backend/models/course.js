const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }
  ],

  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    }
  ],

  isPublished: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);