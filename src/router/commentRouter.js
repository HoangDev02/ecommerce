const express = require('express')
const router = express.Router()
const commentController = require('../app/controller/commentController')
const middleware = require('../app/middleware/middleware')
router.post('/create',middleware.verifyAdmin,commentController.postComment)
router.get('/:productId',commentController.getCommentByUserId)
router.put('/update/:id',middleware.verifyAdmin,commentController.updateCommentByUserId)
router.delete('/delete/:id',middleware.verifyAdmin,commentController.deleteCommentByUserId)

module.exports = router