const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const createAdmin = async () => {

  try {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      fullname: "Super Admin",
      email: "admin@lms.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully");

    process.exit();

  } catch (error) {

    console.log(error);
    process.exit();

  }

};

createAdmin();