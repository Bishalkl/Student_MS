const db = require("../config/db");

const Task = {};

// Create a new task
Task.create = (userId, title, description, status = "pending", result) => {
  const query =
    "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, title, description, status], (err, res) => {
    if (err) {
      console.error("Error while adding task:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, userId, title, description, status });
  });
};

// Get all tasks for a user
Task.getAll = (userId, result) => {
  const query = "SELECT * FROM tasks WHERE user_id = ?";

  db.query(query, [userId], (err, res) => {
    if (err) {
      console.error("Error while fetching tasks:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// New method to get all tasks for the admin (without filtering by user)
Task.getAllForAdmin = (result) => {
  const query = "SELECT * FROM tasks";

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error while fetching tasks for admin:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Update task details (title, description, and status)
Task.update = (taskId, title, description, status, result) => {
  const query =
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";

  db.query(query, [title, description, status, taskId], (err, res) => {
    if (err) {
      console.error("Error while updating task:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

// Delete a task
Task.delete = (taskId, result) => {
  const query = "DELETE FROM tasks WHERE id = ?";

  db.query(query, [taskId], (err, res) => {
    if (err) {
      console.error("Error while deleting task:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Task;
