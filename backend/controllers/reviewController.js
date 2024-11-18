// controllers/reviewController.js
const Review = require('../models/Review');

// Thêm đánh giá mới
exports.createReview = async (req, res) => {
    try {
        const { userId, itemId, itemType, rating, comment } = req.body;

        if (!['Product', 'Deal', 'FeaturedProduct'].includes(itemType)) {
            return res.status(400).json({ message: "Invalid item type" });
        }

        const review = new Review({
            userId,
            itemId,
            itemType,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Failed to add review", error });
    }
};

// Lấy danh sách đánh giá
exports.getReviews = async (req, res) => {
    try {
        const { itemId, itemType } = req.query;

        if (!itemId || !['Product', 'Deal', 'FeaturedProduct'].includes(itemType)) {
            return res.status(400).json({ message: "Invalid item type or item ID" });
        }

        const reviews = await Review.find({ itemId, itemType }).populate("userId", "username");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error });
    }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId, userId } = req.body;

        if (!reviewId) {
            return res.status(400).json({ message: "Review ID is required" });
        }
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review", error });
    }
};

