const express = require('express')
const router = express.Router()
const cartController = require('../app/controller/cartController')

router.get('/:userId',cartController.getCart)
router.get('/', cartController.getCarts)
router.post('/:userId', cartController.addCart)
router.delete('/:userId', cartController.deleteCart)
router.put('/:userId', cartController.updateCartQuantity)
module.exports = router