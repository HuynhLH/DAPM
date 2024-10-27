const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealControllers');


router.post('/', dealController.createDeal);
router.get('/', dealController.getAllDeals);
router.get('/:id', dealController.getDealById);
router.put('/:id', dealController.updateDeal);
router.delete('/:id', dealController.deleteDeal);

module.exports = router;
