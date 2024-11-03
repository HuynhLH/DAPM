const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID của sản phẩm, deal hoặc featured product
    itemType: { type: String, enum: ['Product', 'Deal', 'FeaturedProduct'], required: true }, // Loại đánh giá: Product, Deal, hoặc FeaturedProduct
    rating: { type: Number, min: 1, max: 5, required: true }, // Số sao đánh giá từ 1 đến 5
    comment: { type: String }, // Nhận xét của người dùng
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
