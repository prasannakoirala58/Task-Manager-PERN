const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
// All of these are prefixed with /api
app.use("/api", authRoutes); // /api/register, /api/login
app.use("/api", taskRoutes); // /api/tasks, /api/tasks/:id
app.use("/api", profileRoutes); // /api/profile

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
