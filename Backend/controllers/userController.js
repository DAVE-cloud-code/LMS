const User = require("../models/user");

exports.assignPlacement = async (req, res) => {
  try {
    const { userId } = req.params;
    const { placement, school } = req.body;

    const instructor = await User.findById(userId);

    if (!instructor) {
      return res.status(404).json({
        message: "Instructor not found"
      });
    }

    if (instructor.role !== "instructor") {
      return res.status(400).json({
        message: "Selected user is not an instructor"
      });
    }

    instructor.placement = placement;
    instructor.school = school;

    await instructor.save();

    res.status(200).json({
      message: "Placement assigned successfully",
      instructor
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};