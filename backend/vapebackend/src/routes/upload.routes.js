const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const { uploadImage } = require("../controllers/upload.controller");
const { protect } = require("../middleware/auth.middleware");

// ===== MULTER SETUP =====
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({ storage });

// ===== ROUTE =====
router.post("/", protect, upload.single("image"), uploadImage);

module.exports = router;