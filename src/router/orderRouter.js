const express = require('express')
const router = express.Router()
const orderController = require('../app/controller/orderController')

router.get('/:userId', orderController.getOrderById)

module.exports = router;