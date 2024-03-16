const Order = require('../models/orderModel');

const orderController = {
  getOrderById: async (req, res) => {
    try {
      const order = await Order.find({ userId: req.user.id} ).lean();
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  },
  statusOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.body.id);
      order.status = req.body.status;
      if(!order) return res.status(400).json({message: 'Order not found'});
      await order.save()
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = orderController;
