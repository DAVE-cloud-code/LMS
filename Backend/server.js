const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const authRoutes = require("./routes/auth");
const path = require("path");
const courseRoutes = require("./routes/course");
const lessonRoutes = require("./routes/lesson");
const assignmentRoutes = require("./routes/assignment");
const submissionRoutes = require("./routes/submission");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendance");
const classSessionRoutes = require("./routes/classSession");
const studentRoutes = require("./routes/student");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Static (optional)
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.send("LMS is running...");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/class", classSessionRoutes);
app.use("/api/students", studentRoutes);


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

// Start server safely
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();