const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Use environment variable once and reuse
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  // ✅ Check for Bearer token in Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET); // Decode JWT
      req.user = await User.findById(decoded.id).select("-password"); // remove password just in case
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
