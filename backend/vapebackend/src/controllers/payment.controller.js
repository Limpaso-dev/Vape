// ===== MOCK PAYMENT (for now) =====
exports.processPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    // Simulate payment success
    res.json({
      message: "Payment successful ✅",
      amount,
      status: "paid"
    });

  } catch (err) {
    console.error("PAYMENT ERROR:", err.message);
    next(err);
  }
};