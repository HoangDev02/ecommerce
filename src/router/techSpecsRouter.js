const express = require('express')
const router = express.Router()
const techSpecsController = require('../app/controller/techSpecsController')
const middleware = require('../app/middleware/middleware')
router.get('/',techSpecsController.getTechSpecs)
router.post('/create',middleware.verifyAdmin,techSpecsController.createTechSpec)
router.put('/update/:id',middleware.verifyAdmin,techSpecsController.updateTechSpecs)
router.delete('/delete/:id',middleware.verifyAdmin,techSpecsController.deleteTechSpec)

module.exports = router