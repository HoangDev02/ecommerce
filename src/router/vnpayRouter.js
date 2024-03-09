const express = require('express');
const router = express.Router();
const vnpayController = require('../app/controller/vnpayController');
router.post('/vnpay',vnpayController.vnpay);
module.exports = router;