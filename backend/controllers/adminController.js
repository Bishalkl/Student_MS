const Task = require("../models/task"); // Make sure you import your task model

// Admin function to get all reports (tasks for all users)
const getReports = (req, res) => {
  // Query the database to get all tasks for all users
  Task.getAll((err, tasks) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching reports", error: err });
    }
    res.json({ message: "Reports fetched successfully", tasks });
  });
};

module.exports = { getReports };
