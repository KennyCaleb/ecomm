const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    state: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
      min : 5
    },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model("customers", customerSchema)
module.exports = Customers