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
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // ✅ Ownership check
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this course"
      });
    }

    // ✅ Update fields manually 
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.category = req.body.category || course.category;
    course.thumbnail = req.body.thumbnail || course.thumbnail;

    await course.save();

    res.json({
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // ✅ Ownership check
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this course"
      });
    }

    await course.deleteOne();

    res.json({
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};