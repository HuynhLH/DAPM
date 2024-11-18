const express = require('express');
const router = express.Router();
const recentlyViewedController = require('../controllers/recentlyViewedController');

// Thêm sản phẩm vào danh sách đã xem
router.post('/recently-viewed', recentlyViewedController.addRecentlyViewedProduct);

// Lấy danh sách sản phẩm đã xem
router.get('/recently-viewed/:userid', recentlyViewedController.getRecentlyViewedProducts);

// Xóa sản phẩm khỏi danh sách đã xem
router.delete('/recently-viewed/:userid/:productid', recentlyViewedController.removeRecentlyViewedProduct);

module.exports = router;
