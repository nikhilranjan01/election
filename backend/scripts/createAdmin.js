const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { connectDB } = require("../config/db");
require("dotenv").config();

const createAdmin = async (email, password) => {
  try {
    await connectDB();

    email = email.toLowerCase().trim();

    if (password.length < 6) {
      console.log("❌ Password must be at least 6 characters");
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("❌ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

// 🔥 Change email/password here
createAdmin("admin@jietjodhpur.ac.in", "12345678");
