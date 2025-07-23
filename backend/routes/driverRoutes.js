const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/driver/login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Find user by phone number and make sure isDriver === true
    const user = await User.findOne({ phone, isDriver: true });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
