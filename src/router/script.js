const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../app/models/orderModel');
const Cart = require('../app/models/cartModel');
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const cartItems = req.body.cartItems.products; // Lưu danh sách sản phẩm trong giỏ hàng vào biến tạm thời

    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.img],
            description: item.description,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.REACT_APP_FRONTEND_URL}success`,
      cancel_url: `${process.env.REACT_APP_FRONTEND_URL}product`,
    });

    // Lưu đơn hàng vào MongoDB
    const order = new Order({
      products: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    await order.save();

    // Xóa sản phẩm khỏi giỏ hàng sau khi thanh toán thành công
    const cart = await Cart.findById(req.body.cartItems._id);
    cart.products = cart.products.filter((item) => !cartItems.some((product) => product._id.toString() === item._id.toString()));
    await cart.save();

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
