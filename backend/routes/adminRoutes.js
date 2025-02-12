const express = require("express");
const router = express.Router();
const { getReports } = require("../controllers/adminController");
const authenticateJWT = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminMiddleware");

// Admin route to view reports (only accessible by admins)
router.get("/admin/reports", authenticateJWT, authenticateAdmin, getReports);

module.exports = router;
