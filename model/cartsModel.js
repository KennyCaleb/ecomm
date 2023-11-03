const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "customers"
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "products"
    },
    qty:{
      type : Number,
      required : true
    }
  },
  {
    timestamps: true,
  }
);

const Carts = mongoose.model("carts", cartSchema);
module.exports = Carts;
