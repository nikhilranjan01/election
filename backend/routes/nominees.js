const express = require("express");
const Nominee = require("../models/Nominee");
const User = require("../models/User");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

/* ================= ADMIN ================= */

// ➕ Add nominee (ADMIN ONLY)
router.post("/", auth, adminAuth, async (req, res) => {
  const { name, position } = req.body;

  if (!name || !position) {
    return res.status(400).json({ msg: "Name and position required" });
  }

  try {
    const exists = await Nominee.findOne({ name, position });
    if (exists) {
      return res.status(400).json({ msg: "Nominee already exists" });
    }

    const nominee = new Nominee({ name, position });
    await nominee.save();

    res.status(201).json(nominee);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ❌ Soft delete nominee (ADMIN ONLY)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const nominee = await Nominee.findById(req.params.id);

    if (!nominee) {
      return res.status(404).json({ msg: "Nominee not found" });
    }

    nominee.approved = false;
    await nominee.save();

    res.json({ msg: "Nominee removed" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= STUDENT ================= */

// 📥 Get approved nominees
router.get("/", async (req, res) => {
  try {
    const nominees = await Nominee.find({ approved: true });
    res.json(nominees);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 🗳️ Vote (STUDENT ONLY, ONE TIME)
router.put("/:id/vote", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.role !== "student") {
      return res.status(403).json({ msg: "Only students can vote" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    const nominee = await Nominee.findById(req.params.id);
    if (!nominee || !nominee.approved) {
      return res.status(404).json({ msg: "Nominee not found" });
    }

    // 🔥 Atomic vote increment (no race condition)
    await Nominee.findByIdAndUpdate(req.params.id, {
      $inc: { votes: 1 },
    });

    // 🔒 Lock user voting
    user.hasVoted = true;
    await user.save();

    res.json({ msg: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
