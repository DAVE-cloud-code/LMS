const Submission = require("../models/submission");
const Assignment = require("../models/assignment");

// Submit Assignment
exports.submitAssignment = async (req, res) => {
    try {
        console.log("===== SUBMISSION START =====");
        console.log("Assignment ID:", req.params.assignmentId);
        console.log("User:", req.user);
        console.log("File:", req.file);

        const assignment = await Assignment.findById(req.params.assignmentId);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        if (new Date() > new Date(assignment.dueDate)) {
            return res.status(400).json({
                message: "The deadline for this assignment has passed"
            });
        }

        if (!req.file) {
            console.log("NO FILE RECEIVED");

            return res.status(400).json({
                message: "Please upload your assignment file"
            });
        }

        console.log("Uploaded file URL:", req.file.path);
        console.log("Uploaded file name:", req.file.originalname);

        const existingSubmission = await Submission.findOne({
            assignment: assignment._id,
            student: req.user.id
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: "You have already submitted this assignment"
            });
        }

        const submission = await Submission.create({
            assignment: assignment._id,
            student: req.user.id,
            fileUrl: req.file.path,
            fileName: req.file.originalname,
            submittedAt: new Date(),
            status: "submitted"
        });

        console.log("SUBMISSION SAVED:", submission._id);
        console.log("===== SUBMISSION SUCCESS =====");

        return res.status(201).json({
            message: "Assignment submitted successfully",
            submission
        });

    } catch (error) {
        console.error("===== SUBMISSION ERROR =====");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Full error:", error);
        console.error("Stack:", error.stack);

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File is too large. Maximum size is 10MB"
            });
        }

        return res.status(500).json({
            message: error.message || "Something went wrong"
        });
    }
};

// Student: Get All My Submissions
exports.getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            student: req.user.id
        })
            .populate({
                path: "assignment",
                populate: {
                    path: "instructor",
                    select: "fullname"
                }
            })
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Student: Get One Own Submission
exports.getMySubmission = async (req, res) => {
    try {
        const submission = await Submission.findOne({
            _id: req.params.submissionId,
            student: req.user.id
        }).populate("assignment", "title description dueDate");

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Instructor: Grade Submission
exports.gradeSubmission = async (req, res) => {
    try {
        const { grade, feedback } = req.body;
        const numericGrade = Number(grade);

        if (!Number.isFinite(numericGrade) || numericGrade < 0 || numericGrade > 100) {
            return res.status(400).json({
                message: "Grade must be a number between 0 and 100"
            });
        }

        const submission = await Submission.findById(req.params.submissionId)
            .populate("assignment");

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        if (
            submission.assignment.instructor.toString() !==
            req.user.id.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to grade this submission"
            });
        }

        submission.grade = numericGrade;
        submission.feedback = typeof feedback === "string" ? feedback.trim() : "";
        submission.status = "graded";
        submission.gradedAt = new Date();

        await submission.save();

        res.json({
            message: "Assignment graded successfully",
            submission
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
