const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


router.post('/', cartController.createCart);
router.get('/:Id', cartController.getCartByUserId);
router.put('/:Id', cartController.updateCart);

router.delete('/:Id', cartController.deleteCart);

module.exports = router;
