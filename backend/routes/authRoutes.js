// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define the signup route
router.post("/signup", authController.signup);

// Define the login route
router.post("/login", authController.login);

module.exports = router;
