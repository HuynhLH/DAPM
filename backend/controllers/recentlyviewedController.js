const RecentlyViewed = require('../models/RecentlyVieweds');

// Thêm sản phẩm vào đã xem
exports.addRecentlyViewed = async (req, res) => {
    try {
        // Kiểm tra xem userid và productid có tồn tại trong req.body hay không
        if (!req.body.userid || !req.body.productid) {
            return res.status(400).json({ message: 'UserId and ProductId are required' });
        }

        const recentlyViewed = new RecentlyViewed(req.body);
        await recentlyViewed.save();
        res.status(201).json(recentlyViewed);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Lấy sản phẩm đã xem của người dùng theo id
exports.getRecentlyViewedByUserId = async (req, res) => {
    try {
        const userId = req.params.id; 
        const recentlyViewedItems = await RecentlyViewed.find({ userid: userId }).populate('productid');

        if (!recentlyViewedItems || recentlyViewedItems.length === 0) {
            return res.status(404).json({ message: 'No recently viewed products found' });
        }

        res.status(200).json(recentlyViewedItems);
    } catch (error) {
        console.error('Error fetching recently viewed products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Xóa tất cả sản phẩm đã xem của người dùng theo id
exports.deleteRecentlyViewed = async (req, res) => {
    try {
        const userId = req.params.id; // Sử dụng 'id' thay vì 'userId'
        await RecentlyViewed.deleteMany({ userid: userId });
        res.status(204).send(); // Trả về mã 204 No Content
    } catch (error) {
        console.error('Error deleting recently viewed products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

