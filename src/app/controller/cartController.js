const cartModel = require("../models/cartModel");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");

const calculateSubtotal = (products) =>
  products.reduce((acc, item) => acc + item.total, 0);

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
      const cart = await cartModel.findOne({ userId: req.user.id});
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
    const userId = req.user.id;

    try {
      let cart = await cartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Tìm sản phẩm và cập nhật số lượng và tổng tiền
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      // Sử dụng toán tử $set để cập nhật mảng sản phẩm
      const update = {
        $set: {
          [`products.${productIndex}.quantity`]: quantity < 0 ? 0 : quantity,
        },
      };

      // Cập nhật giỏ hàng và tính lại subtotal
      cart.products[productIndex].quantity = quantity < 0 ? 0 : quantity;
      cart.products[productIndex].total =
        cart.products[productIndex].price * quantity;
      cart.subtotal = calculateSubtotal(cart.products);

      // Sử dụng findOneAndUpdate để đảm bảo atomicity
      cart = await cartModel.findOneAndUpdate({ userId }, update, {
        new: true,
      });

      return res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  addCart: async (req, res, next) => {
    const { name, price, img, productId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    const userId = req.params.userId;

    try {
      const user = await userModel.findById(userId);
      if (!userId || !user) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid user ID" });
      }

      const product = await productModel.findById(productId);
      if (!product) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid product ID" });
      }

      let cart = await cartModel.findOne({ userId: userId });

      if (cart) {
        const itemIndex = cart.products.findIndex(
          (p) => p.productId.toString() === productId
        );

        if (itemIndex !== -1) {
          cart.products[itemIndex].quantity += quantity;
          cart.products[itemIndex].total =
            cart.products[itemIndex].quantity * cart.products[itemIndex].price;
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

        cart.subtotal = cart.products.reduce(
          (acc, item) => acc + item.total,
          0
        );
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
    const userId = req.user.id;
    const productId = req.body.productId;
    console.log("userId", userId);
    try {
      const cart = await cartModel.findOne({ userId: userId });
      if (!cart) {
        res.status(400).send("Cart not found");
      }

      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        cart.subtotal = cart.products.reduce(
          (acc, item) => acc + item.total,
          0
        );
        await cart.save();
        return res.status(200).json(cart);
      } else {
        res.status(400).json("Item does not exist in cart");
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cartController;
