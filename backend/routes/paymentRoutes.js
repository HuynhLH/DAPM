// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPaymentMethod, getPaymentMethods,deletePaymentMethod } = require('../controllers/paymentController');
const middlewareController = require('../controllers/middlewareController');

// Tạo phương thức thanh toán mới
router.post('/create',middlewareController.verifyTokenAndAdminAuth, createPaymentMethod);

// Lấy danh sách phương thức thanh toán
router.get('/', getPaymentMethods);

router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, deletePaymentMethod);

module.exports = router;
