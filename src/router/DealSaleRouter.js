const express = require('express')
const router = express.Router()
const dealineSaleController = require('../app/controller/dealController')

router.post('/create', dealineSaleController.createDealSale)
router.get('/', dealineSaleController.getProductDealSale)
module.exports = router