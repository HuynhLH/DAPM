const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    discount: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
    colors: [{ type: String }],  
    sizes: [{ type: String }],   
    brand: { type: String }, 
    tags: [{ type: String }]

}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;
