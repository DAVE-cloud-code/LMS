const Assignment = require("../models/assignment");
const Submission = require("../models/submission");

// Create Assignment
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({
                message: "Title, description and due date are required"
            });
        }

        const assignment = await Assignment.create({
            title: title.trim(),
            description: description.trim(),
            instructor: req.user.id,
            dueDate
        });

        res.status(201).json({
            message: "Assignment created successfully",
            assignment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Assignments (Students)
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate("instructor", "fullname")
            .sort({ createdAt: -1 });

        res.json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get One Assignment (Student submission page)
exports.getAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id)
            .populate("instructor", "fullname");

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json(assignment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get Submissions For An Assignment (Instructor)
exports.getAssignmentSubmissions = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({
            _id: req.params.assignmentId,
            instructor: req.user.id
        });

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found or you are not authorized to view it"
            });
        }

        const submissions = await Submission.find({
            assignment: req.params.assignmentId
        })
            .populate("student", "fullname email")
            .sort({ createdAt: -1 });

        res.json({
            assignment,
            submissions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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
            return res.status(404).json({ message: "Assignment not found" });
        }

        await Submission.deleteMany({
            assignment: req.params.id
        });

        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
