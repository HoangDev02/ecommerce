const Order = require('../models/orderModel');

const orderController = {
  getOrderById: async (req, res) => {
    try {
      const order = await Order.find({ userId: req.params.userId }).lean();
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = orderController;
