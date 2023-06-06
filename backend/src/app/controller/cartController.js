const cartModel = require('../models/cartModel');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');

const cartController = {
  getCarts: async (req, res, next) => {
    try {
      const carts = await cartModel.find();
      res.status(200).json(carts);
    } catch (err) {
      next(err);
    }
  },
  getCart: async (req, res, next) => {
    try {
      const cart = await cartModel.findOne({ userId: req.params.userId });
      if (!cart) {
        res.status(404).send("Cart not found");
      }
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  },
  updateCartQuantity: async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;
  
    try {
      let cart = await cartModel.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const product = cart.products.find((p) => p.productId.toString() === productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Update the quantity
      product.quantity = quantity < 0 ? 0 : quantity;
      product.total = product.price * product.quantity;
  
      // Recalculate the subtotal
      cart.subtotal = cart.products.reduce((acc, item) => acc + item.total, 0);
  
      await cart.save();
  
      return res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  addCart: async (req, res, next) => {
    const { name, price, img, productId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    const userId = req.params.userId;

    try {
      const user = await userModel.findById(userId);
      if (!userId || !user) {
        return res.status(400).send({ status: false, message: "Invalid user ID" });
      }

      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(400).send({ status: false, message: "Invalid product ID" });
      }

      let cart = await cartModel.findOne({ userId: userId });

      if (cart) {
        const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

        if (itemIndex !== -1) {
          cart.products[itemIndex].quantity += quantity;
          cart.products[itemIndex].total = cart.products[itemIndex].quantity * cart.products[itemIndex].price;
        } else if (quantity > 0) {
          cart.products.push({
            productId: productId,
            quantity: quantity,
            name: name,
            price: price,
            img: img,
            total: price * quantity,
          });
        }

        cart.subtotal = cart.products.reduce((acc, item) => acc + item.total, 0);
        cart = await cart.save();
        return res.status(200).json(cart);
      } else {
        const newCart = await cartModel.create({
          userId: userId,
          products: [
            {
              productId: productId,
              quantity: quantity,
              name: name,
              price: price,
              img: img,
              total: price * quantity,
            },
          ],
          subtotal: price * quantity,
        });
        return res.status(201).json(newCart);
      }
    } catch (err) {
      next(err);
    }
  },
  deleteCart: async (req, res, next) => {
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
      const cart = await cartModel.findOne({ userId: userId });
      if (!cart) {
        res.status(400).send('Cart not found');
      }

      const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
      if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        cart.subtotal = cart.products.reduce((acc, item) => acc + item.total, 0);
        await cart.save();
        return res.status(200).json(cart);
      } else {
        res.status(400).send('Item does not exist in cart');
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cartController;
