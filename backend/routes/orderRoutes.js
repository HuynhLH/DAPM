const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUser, updateOrderStatus } = require('../controllers/orderController');

// Tạo đơn hàng mới
router.post('/create', createOrder);

// Lấy danh sách đơn hàng của người dùng
router.get('/:userId', getOrdersByUser);

// Cập nhật trạng thái đơn hàng (Admin hoặc User có thể cập nhật)
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
