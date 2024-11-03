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
