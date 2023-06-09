const express = require('express')
const router = express.Router()
const cartController = require('../app/controller/cartController')
const middleware = require('../app/middleware/middleware')

router.get('/:userId',cartController.getCart)
router.get('/', cartController.getCarts)
router.post('/:userId', cartController.addCart)
router.delete('/:userId', cartController.deleteCart)
router.put('/:userId', cartController.updateCartQuantity)
module.exports = router