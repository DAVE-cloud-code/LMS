const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createInstructor = async () => {

  try {

    const hashedPassword = await bcrypt.hash("instructor123", 10);

    const instructor = new User({
      fullname: "John Doe",
      email: "instructor@lms.com",
      password: hashedPassword,
      role: "instructor"
    });

    await instructor.save();

    console.log("Instructor created successfully");

    process.exit();

  } catch (error) {

    console.log(error);
    process.exit();

  }

};

createInstructor();