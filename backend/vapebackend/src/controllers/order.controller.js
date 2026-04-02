const Order = require("../models/order.model");

// ===== CREATE ORDER =====
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.message);
    next(err);
  }
};

// ===== GET USER ORDERS =====
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err.message);
    next(err);
  }
};