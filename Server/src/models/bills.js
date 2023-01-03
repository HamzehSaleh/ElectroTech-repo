const mongoose = require("mongoose");

const Bill = mongoose.model("Bill", {
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    required: true,
  },
});

module.exports = Bill;
