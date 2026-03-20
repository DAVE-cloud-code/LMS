const Assignment = require("../models/assignment");

exports.createAssignment = async (req, res) => {

  try {

    const assignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description,
      course: req.body.course,
      instructor: req.user.id,
      dueDate: req.body.dueDate
    });

    res.status(201).json(assignment);

  } catch (error) {

    res.status(500).json({
      message: "Error creating assignment",
      error: error.message
    });

  }

};

exports.getCourseAssignments = async (req, res) => {

  try {

    const assignments = await Assignment.find({
      course: req.params.courseId
    });

    res.json(assignments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};