const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nominee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
      required: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// 🔥 IMPORTANT: one vote per user per position
voteSchema.index({ user: 1, position: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
