const Cart = require('../models/Cart');

// Tạo giỏ hàng mới
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy giỏ hàng của người dùng
exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.params.userId }).populate('products.product_id');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật giỏ hàng
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate({ user_id: req.params.userId }, req.body, { new: true });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa giỏ hàng
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user_id: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
