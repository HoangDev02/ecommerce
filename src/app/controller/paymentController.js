const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const paymentController = {
    payment: async (req, res) => {
        try {
            const cartItems = req.body.cartItems.products;
            const subtotal = req.body.subtotal;
            const userId = req.body.userId; // Lấy userId từ body của yêu cầu
            const name = req.body.name;
            const phone = req.body.phone;
            const address = req.body.address;
            // Xóa sản phẩm khỏi giỏ hàng sau khi thanh toán thành công
            const cart = await Cart.findById(req.body.cartItems._id);
            cart.products = cart.products.filter((item) => !cartItems.some((product) => product._id.toString() === item._id.toString()));
            await cart.save();
            
            // Lưu đơn hàng vào MongoDB với thông tin userId
            console.log("userId "+ userId);
            const order = new Order({
                userId: userId,
                products: cartItems.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                })),
                address: address,
                subtotal: subtotal,
                name: name,
                phone: phone,
                subtotal: subtotal,
                paymentMethod: req.body.paymentMethod,
                status: true
            });
            console.log(order);

            await order.save();
            res.status(200).json({ message: 'Payment success' }); 
        } catch (err) {
            res.status(500).json(err); 
        }
    }
};

module.exports = paymentController;