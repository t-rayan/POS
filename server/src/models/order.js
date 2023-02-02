const mongoose = require("mongoose");

// initalizing categorySchema with req fields
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      finalPrice: { type: Number, default: 0 },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  totalProducts: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
