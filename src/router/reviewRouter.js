const express = require('express');
const router = express.Router();
const reviewsController = require('../app/controller/reviewsController');
const middleware = require('../app/middleware/middleware');
router.post('/create', middleware.verifyAdmin,reviewsController.createReview);
router.get('/:productId', reviewsController.getReviewsbyProductId);
router.get('/:slug', reviewsController.getReviewById);
router.put('/update/:id',middleware.verifyAdmin, reviewsController.updateReview);
router.delete('/delete/:id', middleware.verifyAdmin,reviewsController.deleteReview);

module.exports = router;
