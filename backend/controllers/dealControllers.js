
const Deal = require('../models/Deal');

// Lấy tất cả deals
const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm deal mới
const createDeal = async (req, res) => {
    const deal = new Deal(req.body);
    try {
        const savedDeal = await deal.save();
        res.status(201).json(savedDeal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteDeal = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedDeal = await Deal.findByIdAndDelete(id);

        if (!deletedDeal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.json({ message: 'Deal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateDeal = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedDeal = await Deal.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedDeal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.json(updatedDeal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDeals,
    createDeal,
    updateDeal, 
    deleteDeal,
};