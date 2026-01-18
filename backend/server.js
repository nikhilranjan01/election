const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const nomineeRoutes = require("./routes/nominees");
const voteRoutes = require("./routes/votes");
const { connectDB } = require("./config/db");

dotenv.config(); // 🔥 env load

const app = express();

// 🔥 Proper CORS (localhost safe, hosting ready)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend local
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 🔥 DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/nominees", nomineeRoutes);
app.use("/api/votes", voteRoutes);

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Student Election Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
