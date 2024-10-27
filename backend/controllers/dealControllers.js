const Deal = require('../models/Deal');

// Create a new deal
exports.createDeal = async (req, res) => {
    try {
        const deal = new Deal(req.body);
        await deal.save();
        res.status(201).json({ message: 'Deal created successfully!', deal });
    } catch (error) {
        res.status(400).json({ message: 'Error creating deal', error });
    }
};

// Get all deals
exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find().populate('category');
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deals', error });
    }
};

// Get a single deal by ID
exports.getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id).populate('category');
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deal', error });
    }
};

// Update a deal
exports.updateDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.status(200).json({ message: 'Deal updated successfully!', deal });
    } catch (error) {
        res.status(400).json({ message: 'Error updating deal', error });
    }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndDelete(req.params.id);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.status(200).json({ message: 'Deal deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting deal', error });
    }
};
