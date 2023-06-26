const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController')
const middlewate = require('../app/middleware/middleware')

router.post('/create',productController.createProduct)
router.put('/update/:id',productController.updateProduct)
router.delete('/delete/:id',middlewate.verifyUser,productController.deleteProduct)

//get product
router.get('/suggest', productController.getSuggestNewCategories)
router.get('/edit/:id', productController.editProduct)
router.get('/home', productController.getProducts)
router.get('/', productController.getProductsAll)
router.get('/sort', productController.SortProductAscending)
router.get('/:slug', productController.getProduct)
router.get('/:slug', productController.getProduct)
module.exports = router