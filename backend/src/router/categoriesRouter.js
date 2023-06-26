const express = require('express')
const router = express.Router()
const categoriesController = require('../app/controller/categoriesController')

router.get('/newcategory', categoriesController.getNewCategories)
router.get('/suggest', categoriesController.getSuggestNewCategories)
router.get('/:slug', categoriesController.getFindNewCategories)
router.get('/', categoriesController.getCategories)
router.get('/:id', categoriesController.getCategory)

router.post('/create', categoriesController.createCategories)
router.put('/update/:id', categoriesController.updateCategories)
router.delete('/delete/:id', categoriesController.deleteCategories)
module.exports = router