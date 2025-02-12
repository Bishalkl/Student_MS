const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const db = require("../config/db"); // We'll create this in Step 3

// User model
const User = {
  // Create a new user
  create: (name, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, results) => {
          if (err) return callback(err);
          callback(null, results);
        }
      );
    });
  },

  // Find user by email
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
};

module.exports = User;
