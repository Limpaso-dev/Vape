const express = require("express");
const router = express.Router();

const { processPayment } = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

// Process payment
router.post("/", protect, processPayment);

module.exports = router;