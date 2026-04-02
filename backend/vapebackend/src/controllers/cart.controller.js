const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// ===== GET CART =====
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("GET CART ERROR:", err.message);
    next(err);
  }
};

// ===== ADD TO CART =====
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err.message);
    next(err);
  }
};

// ===== UPDATE ITEM =====
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (quantity == null || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    console.error("UPDATE CART ERROR:", err.message);
    next(err);
  }
};

// ===== REMOVE ITEM =====
exports.removeCartItem = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    console.error("REMOVE ITEM ERROR:", err.message);
    next(err);
  }
};

// ===== CLEAR CART =====
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared ✅" });
  } catch (err) {
    console.error("CLEAR CART ERROR:", err.message);
    next(err);
  }
};