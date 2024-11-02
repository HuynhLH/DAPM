const Review = require('../models/reviews');

// Thêm đánh giá mới
exports.addReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả đánh giá của một sản phẩm
exports.getReviewsByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ product_id: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
