const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// ===== PROTECT (logged-in users only) =====
exports.protect = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB (safer than trusting token)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ===== ADMIN ONLY =====
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};