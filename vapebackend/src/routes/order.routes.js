const router = require("express").Router();
const Order = require("../models/Order");
const stripe = require("../config/stripe");

// Create Stripe checkout session
router.post("/checkout", async (req, res) => {
  const { products } = req.body;

  try {
    // Calculate total
    const amount = products.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map(item => ({
        price_data: {
          currency: "aud",
          product_data: { name: item.name },
          unit_amount: item.price * 100 // Stripe uses cents
        },
        quantity: item.quantity
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
