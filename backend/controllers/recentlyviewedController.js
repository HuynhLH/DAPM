const RecentlyViewed = require('../models/RecentlyVieweds')

// Thêm sản phẩm vào đã xem
exports.addRecentlyViewed = async (req, res) => {
    try {
        const recentlyViewed = new RecentlyViewed(req.body);
        await recentlyViewed.save();
        res.status(201).json(recentlyViewed);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy sản phẩm đã xem của người dùng
exports.getRecentlyViewedByUserId = async (req, res) => {
    try {
        const recentlyViewed = await RecentlyViewed.find({ user_id: req.params.userId }).populate('product_id');
        res.status(200).json(recentlyViewed);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa sản phẩm đã xem
exports.deleteRecentlyViewed = async (req, res) => {
    try {
        await RecentlyViewed.deleteMany({ user_id: req.params.userId });
        res.status(200).json({ message: 'Recently viewed items deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
