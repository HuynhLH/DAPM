const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/get', productController.getProducts);
router.post('/add', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.get('/featured', productController.getFeaturedProducts);

router.put('/featured/:id', productController.updateFeaturedStatus);

module.exports = router;
