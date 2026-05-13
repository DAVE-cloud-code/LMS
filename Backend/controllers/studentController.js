const Student = require("../models/student");

// ✅ Add student
exports.addStudent = async (req, res) => {
    try {

        const student = await Student.create({
            fullname: req.body.fullname,
            instructor: req.user.id
        });

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ✅ Get instructor students
exports.getStudents = async (req, res) => {
    try {

        const students = await Student.find({
            instructor: req.user.id
        });

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ✅ Delete student
exports.deleteStudent = async (req, res) => {
    try {

        await Student.findByIdAndDelete(req.params.studentId);

        res.json({
            message: "Student deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};