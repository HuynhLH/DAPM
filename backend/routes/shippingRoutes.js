// routes/shippingRoutes.js
const express = require('express');
const router = express.Router();
const { createShippingAddress, getShippingAddresses,deleteShippingAddress,updateShippingAddress  } = require('../controllers/shippingController');

// Tạo địa chỉ giao hàng mới
router.post('/create', createShippingAddress);

// Lấy danh sách địa chỉ giao hàng của người dùng
router.get('/:userId', getShippingAddresses);

router.delete('/delete/:addressId', deleteShippingAddress);

router.put('/update/:addressId', updateShippingAddress);

module.exports = router;
