const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const authRoutes = require("./routes/auth");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

//  Routes
app.get("/", (req, res) => {
  res.send("LMS is running...");
});
app.use("/api/auth", authRoutes);

connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});