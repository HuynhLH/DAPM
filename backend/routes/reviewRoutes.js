const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/', reviewController.addReview);
router.get('/:productId', reviewController.getReviewsByProductId);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
