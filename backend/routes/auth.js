const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Student email rule
const studentEmailRegex = /^[a-zA-Z0-9._]+@jietjodhpur\.ac\.in$/;

// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase().trim();

    // Student email validation
    if (!studentEmailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid student email. Must be name@jietjodhpur.ac.in",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Role forcefully student
    const user = new User({
      email,
      password: hashedPassword,
      role: "student",
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid credentials" });

    // Student email check
    if (user.role === "student" && !studentEmailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid student email format",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
