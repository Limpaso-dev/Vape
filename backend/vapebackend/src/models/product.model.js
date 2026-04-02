const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0
    },

    image: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true // admin who created it
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);