const Lesson = require("../models/lesson");
const Course = require("../models/course");

exports.createLesson = async (req, res) => {

  try {

    const { title, description, pdfUrl, courseId } = req.body;

    const lesson = await Lesson.create({
      title,
      description,
      pdfUrl,
      course: courseId,
      createdBy: req.user.id
    });

    await Course.findByIdAndUpdate(
      courseId,
      { $push: { lessons: lesson._id } }
    );

    res.status(201).json({
      message: "Lesson created successfully",
      lesson
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating lesson",
      error: error.message
    });

  }

};