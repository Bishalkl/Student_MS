const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
  // Fetch user profile using req.user.id
  res.json({ message: "User profile" });
});

module.exports = router;
