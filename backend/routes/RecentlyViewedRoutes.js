const express = require('express');
const router = express.Router();
const recentlyViewedController = require('../controllers/recentlyviewedController');

// Thêm sản phẩm vào danh sách đã xem
router.post('/', recentlyViewedController.addRecentlyViewed);

// Lấy sản phẩm đã xem của người dùng theo userId
router.get('/:id', recentlyViewedController.getRecentlyViewedByUserId);

// Xóa tất cả sản phẩm đã xem của người dùng theo userId
router.delete('/:id', recentlyViewedController.deleteRecentlyViewed);

module.exports = router;
