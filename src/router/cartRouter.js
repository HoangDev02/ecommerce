const express = require('express')
const router = express.Router()
const cartController = require('../app/controller/cartController')
const middleware = require('../app/middleware/middleware')

router.get('/cart-buy-order-box',middleware.verifyUser,cartController.getCart)
router.get('/', cartController.getCarts)
router.post('/:userId', cartController.addCart)
router.delete('/cart-delete-order-box',middleware.verifyUser, cartController.deleteCart)
router.put('/:cart-update-order-box',middleware.verifyUser, cartController.updateCartQuantity)
module.exports = router