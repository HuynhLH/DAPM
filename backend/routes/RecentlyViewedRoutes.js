const express = require('express');
const recentlyViewedController = require('../controllers/recentlyviewedController');
const router = express.Router();


router.post('/', recentlyViewedController.addRecentlyViewed);
router.get('/:Id', recentlyViewedController.getRecentlyViewedByUserId);
router.delete('/:userId', recentlyViewedController.deleteRecentlyViewed);

module.exports = router;
