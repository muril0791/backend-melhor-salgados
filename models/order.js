const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
        detail: String,
      },
    ],
    total: Number,
    customerInfo: {
      name: String,
      phone: String,
      address: String,
      paymentMethod: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "preparing",
        "ready",
        "delivered",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
