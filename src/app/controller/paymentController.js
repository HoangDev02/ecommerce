const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const paymentController = {
    payment: async (req, res) => {
        try {
            const cartItems = req.body.cartItems.products;
            const subtotal = req.body.subtotal;
            const userId = req.body.userId; // Lấy userId từ body của yêu cầu

            // Xóa sản phẩm khỏi giỏ hàng sau khi thanh toán thành công
            const cart = await Cart.findById(req.body.cartItems._id);
            cart.products = cart.products.filter((item) => !cartItems.some((product) => product._id.toString() === item._id.toString()));
            await cart.save();

            // Lưu đơn hàng vào MongoDB với thông tin userId
            const order = new Order({
                userId: userId,
                products: cartItems.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                })),
                subtotal: subtotal
            });
            await order.save();

            // Trả về phản hồi thành công cho frontend
            res.sendStatus(200); // Hoặc res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.sendStatus(500); // Hoặc res.json({ success: false, message: 'Error message' });
        }
    }
};

module.exports = paymentController;