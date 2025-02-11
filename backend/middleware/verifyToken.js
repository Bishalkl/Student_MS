const jwt = require("jsonwebtoken");

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove 'Bearer ' prefix

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify the token with the secret
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
