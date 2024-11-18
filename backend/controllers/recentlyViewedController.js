const RecentlyViewed = require('../models/RecentlyVieweds');

// Thêm sản phẩm vào danh sách đã xem của người dùng
const addRecentlyViewedProduct = async (req, res) => {
    try {
        const { userid, productid, dealid } = req.body;

        // Kiểm tra nếu sản phẩm đã được người dùng xem trước đó
        const existingRecord = await RecentlyViewed.findOne({ userid, productid });

        if (existingRecord) {
            return res.status(400).json({ message: 'Sản phẩm đã được xem gần đây.' });
        }

        // Tạo mới bản ghi sản phẩm đã xem
        const newRecentlyViewed = new RecentlyViewed({
            userid,
            productid,
            dealid,
        });

        await newRecentlyViewed.save();
        res.status(201).json({ message: 'Sản phẩm đã được thêm vào danh sách đã xem.', data: newRecentlyViewed });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào danh sách đã xem.', error: error.message });
    }
};

// Lấy danh sách sản phẩm đã xem của người dùng
const getRecentlyViewedProducts = async (req, res) => {
    try {
        const { userid } = req.params;

        const recentlyViewed = await RecentlyViewed.find({ userid })
            .populate('productid', 'name price image_url') // Lấy thông tin sản phẩm
            .populate('dealid', 'dealName') // Lấy thông tin deal nếu có
            .sort({ viewed_at: -1 }); // Sắp xếp theo thời gian xem gần nhất

        if (!recentlyViewed || recentlyViewed.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm đã xem.' });
        }

        res.status(200).json({ message: 'Danh sách sản phẩm đã xem.', data: recentlyViewed });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm đã xem.', error: error.message });
    }
};

// Xóa sản phẩm khỏi danh sách đã xem
const removeRecentlyViewedProduct = async (req, res) => {
    try {
        const { userid, productid } = req.params;

        const deletedProduct = await RecentlyViewed.findOneAndDelete({ userid, productid });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong danh sách đã xem.' });
        }

        res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi danh sách đã xem.', data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi danh sách đã xem.', error: error.message });
    }
};

module.exports = {
    addRecentlyViewedProduct,
    getRecentlyViewedProducts,
    removeRecentlyViewedProduct,
};
