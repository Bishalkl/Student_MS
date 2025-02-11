// backend/routes/taskRoutes.js
const express = require("express");
const db = require("../db"); // Assuming your database connection is set up
const router = express.Router();

router.put("/update/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const { status, title, description, dueDate } = req.body;

  // Check if any value is passed in the request body
  if (!status && !title && !description && !dueDate) {
    return res.status(400).json({ message: "No fields to update" });
  }

  // Prepare update query
  let updateQuery = "UPDATE tasks SET ";
  const values = [];

  // Build query based on provided fields
  if (status) {
    updateQuery += "status = ?, ";
    values.push(status);
  }
  if (title) {
    updateQuery += "title = ?, ";
    values.push(title);
  }
  if (description) {
    updateQuery += "description = ?, ";
    values.push(description);
  }
  if (dueDate) {
    updateQuery += "dueDate = ?, ";
    values.push(dueDate);
  }

  // Remove the last comma and space
  updateQuery = updateQuery.slice(0, -2);
  updateQuery += " WHERE id = ?";

  // Add taskId at the end of the query values
  values.push(taskId);

  // Execute query
  db.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating task" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  });
});

module.exports = router;
