const Product = require("../models/product.model");

// ===== GET ALL PRODUCTS =====
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err.message);
    next(err);
  }
};

// ===== CREATE PRODUCT (ADMIN) =====
exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      image
    } = req.body;

    // ✅ Validation (important)
    if (
      !name ||
      !brand ||
      !category ||
      !description ||
      price == null ||
      countInStock == null ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create product
    const product = await Product.create({
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      image,
      user: req.user._id // admin who created it
    });

    res.status(201).json(product);

  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err.message);
    next(err);
  }
};