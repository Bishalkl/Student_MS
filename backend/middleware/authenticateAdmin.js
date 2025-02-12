const authenticateAdmin = (req, res, next) => {
  const { role } = req.user; // Extract role from JWT (added during login)

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next(); // Proceed if the user is an admin
};

module.exports = authenticateAdmin;
