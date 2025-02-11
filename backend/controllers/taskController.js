// backend/controllers/taskController.js
const db = require("../config/db");

// Add a new task
exports.addTask = (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const userId = req.user.userId; // Extracted from JWT payload

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO tasks (userId, title, description, dueDate, status) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [userId, title, description, dueDate, status],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error adding task" });
      }
      res.status(201).json({ message: "Task added successfully" });
    }
  );
};

// Get all tasks for the logged-in student
exports.getTasks = (req, res) => {
  const userId = req.user.userId;

  const query = "SELECT * FROM tasks WHERE userId = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving tasks" });
    }
    res.status(200).json(results);
  });
};

// Get a specific task by ID
exports.getTask = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM tasks WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving task" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Update a task by ID
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ? WHERE id = ?";
  db.query(query, [title, description, dueDate, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating task" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  });
};

// Delete a task by ID
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting task" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });
};
