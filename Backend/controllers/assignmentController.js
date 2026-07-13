const Assignment = require("../models/assignment");

// Create Assignment
exports.createAssignment = async (req, res) => {

    try {

        const assignment = await Assignment.create({

            title: req.body.title,

            description: req.body.description,

            instructor: req.user.id,

            dueDate: req.body.dueDate

        });

        res.status(201).json({
            message: "Assignment created successfully",
            assignment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get All Assignments (For Students)
exports.getAssignments = async (req, res) => {

    try {

        const assignments = await Assignment.find()
            .populate("instructor", "fullname")
            .sort({ createdAt: -1 });

        res.json(assignments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get Assignments Created By Logged-in Instructor
exports.getMyAssignments = async (req, res) => {

    try {

        const assignments = await Assignment.find({

            instructor: req.user.id

        }).sort({ createdAt: -1 });

        res.json(assignments);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

exports.getAssignmentSubmissions = async (req, res) => {

    try {

        const submissions = await Submission.find({

            assignment: req.params.assignmentId

        })
        .populate("student", "fullname email")
        .sort({ createdAt: -1 });

        res.json(submissions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Delete Assignment
exports.deleteAssignment = async (req, res) => {

    try {

        const assignment = await Assignment.findOneAndDelete({

            _id: req.params.id,

            instructor: req.user.id

        });

        if (!assignment) {

            return res.status(404).json({

                message: "Assignment not found"

            });

        }

        res.json({

            message: "Assignment deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};