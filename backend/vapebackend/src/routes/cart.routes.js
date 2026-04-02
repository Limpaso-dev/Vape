const express = require("express");
const router = express.Router();

const { getCart } = require("../controllers/cart.controller");
const { protect } = require("../middleware/auth.middleware");

// Get user cart (protected)
router.get("/", protect, getCart);

module.exports = router;