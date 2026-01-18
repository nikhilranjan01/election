const express = require("express");
const router = express.Router();

const Vote = require("../models/Vote");
const Nominee = require("../models/Nominee");
const { auth, adminAuth } = require("../middleware/auth");

// ================== CAST A VOTE ==================
router.post("/", auth, async (req, res) => {
  const { nomineeId, position } = req.body;

  try {
    // 🔒 Only students can vote
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Only students can vote" });
    }

    // Validate nominee
    const nominee = await Nominee.findById(nomineeId);
    if (!nominee || !nominee.approved || nominee.position !== position) {
      return res.status(400).json({ msg: "Invalid nominee" });
    }

    const vote = new Vote({
      user: req.user.id,
      nominee: nomineeId,
      position,
    });

    await vote.save();

    res.status(201).json({ msg: "Vote recorded successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ msg: `You have already voted for ${position}` });
    }

    console.error("Vote error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================== VIEW RESULTS (ADMIN ONLY) ==================
router.get("/results", auth, adminAuth, async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $lookup: {
          from: "nominees",
          localField: "nominee",
          foreignField: "_id",
          as: "nominee",
        },
      },
      { $unwind: "$nominee" },
      {
        $group: {
          _id: {
            nomineeId: "$nominee._id",
            nomineeName: "$nominee.name",
            position: "$position",
          },
          votes: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          nomineeName: "$_id.nomineeName",
          position: "$_id.position",
          votes: 1,
        },
      },
      { $sort: { position: 1, votes: -1 } },
    ]);

    res.json(results);
  } catch (error) {
    console.error("Results error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
