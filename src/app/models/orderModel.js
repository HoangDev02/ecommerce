const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  name: { type: String },
  phone: { type: Number },
  address: [
    {
      city: { type: String },
      district: { type: String },
      ward: { type: String },
      streetname: { type: String },
    },
  ],
  paymentMethod: { type: String },
  status: { Boolean },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
