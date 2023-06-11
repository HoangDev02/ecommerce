const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const line_items = req.body.cartItems.products.map((item) => {
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

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
