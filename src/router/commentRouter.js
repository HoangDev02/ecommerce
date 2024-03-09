const express = require('express')
const router = express.Router()
const commentController = require('../app/controller/commentController')
const middleware = require('../app/middleware/middleware')
router.post('/create',middleware.verifyUser,commentController.postComment)
router.get('/:productId',commentController.getCommentByUserId)
router.put('/update/:id',middleware.verifyUser,commentController.updateCommentByUserId)
router.delete('/delete/:id',middleware.verifyUser,commentController.deleteCommentByUserId)

module.exports = router