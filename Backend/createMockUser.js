require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Create a mock user
async function createUser() {
  try {
    const mockUser = new User({
      name: "John Do",
      email: "johndo@example.com",
      password: "123456", // in real app, hash this
      role: "student",
    });

    const savedUser = await mockUser.save();
    console.log("Mock user created:", savedUser);
    mongoose.connection.close();
  } catch (error) {
    console.log("Error creating mock user:", error);
  }
}

createUser();