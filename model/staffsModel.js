const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    role : {
        type:String,
        required : true,
    },

    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Staffs = mongoose.model("staff", staffSchema);
module.exports = Staffs;
