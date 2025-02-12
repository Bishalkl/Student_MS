const express = require("express");
const router = express.Router();
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authenticateJWT = require("../middleware/authMiddleware"); // For authentication

// Route to add a task
router.post("/add", authenticateJWT, addTask);

// Route to get all tasks for a user
router.get("/", authenticateJWT, getTasks);

// Route to update task description or status
router.put("/update", authenticateJWT, updateTask);

// Route to delete a task
router.delete("/delete", authenticateJWT, deleteTask);

module.exports = router;
