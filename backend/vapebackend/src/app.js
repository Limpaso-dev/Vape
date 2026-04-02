const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Admin routes
app.use("/api/admin", require("./routes/admin.routes"));

// ✅ Product routes (with image upload support)
app.use("/api/products", require("./routes/product.routes"));

module.exports = app;
