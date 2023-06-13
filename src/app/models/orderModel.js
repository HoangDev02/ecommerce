const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
