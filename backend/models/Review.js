const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['Product', 'Deal', 'FeaturedProduct'], required: true }, 
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }, 
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
