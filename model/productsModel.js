const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    shippingFee: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      required: true,
      maxlength : 4,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", productSchema);
module.exports = Products;
