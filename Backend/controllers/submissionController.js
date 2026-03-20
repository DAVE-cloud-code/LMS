const Submission = require("../models/submission");

exports.submitAssignment = async (req, res) => {

  try {

    const submission = await Submission.create({

      assignment: req.body.assignmentId,

      student: req.user.id,

      fileUrl: req.body.fileUrl

    });

    res.status(201).json(submission);

  } catch (error) {

    res.status(500).json({
      message: "Submission failed",
      error: error.message
    });

  }

};

exports.gradeSubmission = async (req, res) => {

  try {

    const submission = await Submission.findByIdAndUpdate(

      req.params.submissionId,

      {
        grade: req.body.grade,
        feedback: req.body.feedback
      },

      { new: true }

    );

    res.json(submission);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};