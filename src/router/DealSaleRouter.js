const express = require('express')
const router = express.Router()
const dealineSaleController = require('../app/controller/dealController')
const middleware = require('../app/middleware/middleware')

router.post('/create', middleware.verifyAdmin,dealineSaleController.createDealSale)
router.get('/', dealineSaleController.getProductDealSale)
router.delete('/:id', middleware.verifyAdmin,dealineSaleController.deleteProductInTime)
module.exports = router