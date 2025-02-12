const Task = require("../models/task");

// Add a new task
const addTask = (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.userId; // Extracted from JWT

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  Task.create(userId, title, description, status, (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding task" });
    res.status(201).json({ message: "Task added successfully", task: result });
  });
};

// Get all tasks for a user
const getTasks = (req, res) => {
  const userId = req.user.userId; // Extracted from JWT

  Task.getAll(userId, (err, tasks) => {
    if (err) return res.status(500).json({ message: "Error fetching tasks" });
    res.json(tasks);
  });
};

// Update task details (title, description, status)
const updateTask = (req, res) => {
  const { taskId, title, description, status } = req.body;

  if (!taskId || !status) {
    return res.status(400).json({ message: "Task ID and status are required" });
  }

  Task.update(taskId, title, description, status, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating task" });
    res.json({ message: "Task updated successfully" });
  });
};

// Delete a task
const deleteTask = (req, res) => {
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  Task.delete(taskId, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting task" });
    res.json({ message: "Task deleted successfully" });
  });
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
