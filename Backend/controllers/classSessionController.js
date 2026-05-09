const ClassSession = require("../models/classSession");



// ✅ Instructor starts class
exports.startClass = async (req, res) => {

    try {

        const { courseId, topic } = req.body;

        // generate random attendance code
        const attendanceCode =
            Math.floor(10000 + Math.random() * 90000).toString();

        const session = await ClassSession.create({
            course: courseId,
            instructor: req.user.id,
            topic,
            attendanceCode
        });

        res.status(201).json({
            message: "Class started",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ✅ Student marks attendance
exports.markAttendance = async (req, res) => {

    try {

        const { code } = req.body;

        const session = await ClassSession.findOne({
            attendanceCode: code,
            isActive: true
        });

        if (!session) {
            return res.status(404).json({
                message: "Invalid attendance code"
            });
        }

        // already marked
        if (session.studentsPresent.includes(req.user.id)) {
            return res.status(400).json({
                message: "Attendance already marked"
            });
        }

        session.studentsPresent.push(req.user.id);

        await session.save();

        res.json({
            message: "Attendance marked successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ✅ End class
exports.endClass = async (req, res) => {

    try {

        const session = await ClassSession.findByIdAndUpdate(
            req.params.sessionId,
            { isActive: false },
            { new: true }
        );

        res.json({
            message: "Class ended",
            session
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ✅ Get instructor sessions
exports.getInstructorSessions = async (req, res) => {

    try {

        const sessions = await ClassSession.find({
            instructor: req.user.id
        })
        .populate("course", "title")
        .populate("studentsPresent", "fullname email")
        .sort({ createdAt: -1 });

        res.json(sessions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// ✅ Student attendance history
exports.getStudentAttendance = async (req, res) => {

    try {

        const sessions = await ClassSession.find({
            studentsPresent: req.user.id
        })
        .populate("course", "title")
        .populate("instructor", "fullname");

        res.json(sessions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

