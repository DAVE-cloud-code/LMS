const Course = require("../models/course");

exports.createCourse = async (req, res) => {

  try {

    const { title, description, category, thumbnail } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      thumbnail,
      instructor: req.user.id
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating course",
      error: error.message
    });

  }

};

exports.enrollCourse = async (req, res) => {
  try {

    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    if (course.students.includes(req.user.id)) {
      return res.status(400).json({
        message: "Already enrolled"
      });
    }

    course.students.push(req.user.id);

    await course.save();

    res.json({
      message: "Successfully enrolled"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getAllCourses = async (req, res) => {
  try {

    const courses = await Course.find()
      .populate("instructor", "fullname email");

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.courseId)
      .populate("lessons")
      .populate("instructor", "fullname email");

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getMyCourses = async (req, res) => {

  try {

    const courses = await Course.find({
      students: req.user.id
    }).populate("instructor", "fullname");

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateCourse = async (req, res) => {

  try {

    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );

    res.json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteCourse = async (req, res) => {

  try {

    await Course.findByIdAndDelete(req.params.courseId);

    res.json({
      message: "Course deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};