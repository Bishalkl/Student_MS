const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Registration
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, (err, user) => {
    if (user) return res.status(400).json({ message: "Email already exists" });

    User.create(name, email, password, (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error registering user" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Login route for users (this is where you modify the role part)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token with userId and role
    const token = jwt.sign(
      { userId: user.id, role: user.role }, // Include the role here
      process.env.JWT_SECRET, // Secret to sign the JWT
      { expiresIn: "1h" } // Optional: Expiration time of the token
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// User Logout (Simply delete token on client-side)
const logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
