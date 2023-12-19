const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController')
const middlewate = require('../app/middleware/middleware')
const multer = require('multer');
const path = require('path');
// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Thư mục lưu trữ tập tin
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post('/create',upload.array('images', 5),middlewate.verifyAdmin,productController.createProduct)
router.put('/update/:id',middlewate.verifyAdmin,productController.updateProduct)
router.delete('/delete/:id',middlewate.verifyAdmin,productController.deleteProduct)
router.get('/uploads', express.static('uploads'));
//get product
router.get('/suggest', productController.getSuggestNewCategories)
router.get('/edit/:id',middlewate.verifyAdmin, productController.editProduct)
router.get('/home', productController.getProducts)
router.get('/', productController.getProductsAll)
router.get('/sort', productController.SortProductAscending)
router.get('/:slug', productController.getProduct)
router.get('/:slug', productController.getProduct)
module.exports = router