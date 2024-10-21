
const express = require('express');
const router = express.Router();
const {
    getDeals,
    createDeal,
    updateDeal, 
    deleteDeal,
} = require('../controllers/dealControllers');

// Lấy danh sách deals kkkjclaojijsl
router.get('/get', getDeals);

// Tạo deal mới kkkk
router.post('/add', createDeal);

// Sửa deal theo ID nha
router.put('/update/:id', updateDeal);

// Xóa deal theo ID ha
router.delete('/delete/:id', deleteDeal);

module.exports = router;
