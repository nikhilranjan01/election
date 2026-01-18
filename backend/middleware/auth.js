const jwt = require("jsonwebtoken");

// 🔐 User authentication
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// 🔐 Admin authorization
const adminAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }

  next();
};

module.exports = { auth, adminAuth };
