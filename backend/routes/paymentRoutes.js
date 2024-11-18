// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPaymentMethod, getPaymentMethods } = require('../controllers/paymentController');

// Tạo phương thức thanh toán mới
router.post('/create', createPaymentMethod);

// Lấy danh sách phương thức thanh toán
router.get('/', getPaymentMethods);

module.exports = router;
