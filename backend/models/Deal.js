// models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
