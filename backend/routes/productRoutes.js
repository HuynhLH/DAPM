// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Định nghĩa các route cho sản phẩm
router.get('/get', productController.getProducts);
router.post('/add', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
