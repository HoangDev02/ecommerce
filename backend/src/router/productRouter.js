const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController')

router.post('/create', productController.createProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)

//get product
router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
module.exports = router