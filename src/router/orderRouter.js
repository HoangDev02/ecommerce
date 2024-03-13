const express = require('express')
const router = express.Router()
const orderController = require('../app/controller/orderController')
const middleware = require('../app/middleware/middleware')
router.get('/', middleware.verifyUser,orderController.getOrderById)

module.exports = router;