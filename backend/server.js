// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Import the auth routes
const taskRoutes = require("./routes/taskRoutes"); // Import the task routes

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Use the auth routes
app.use("/api/auth", authRoutes);

// Use the task routes
app.use("/api/tasks", taskRoutes); // Add the task routes here

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
