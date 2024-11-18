const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Sản phẩm thông thường
            deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },     // Sản phẩm khuyến mãi
            quantity: { type: Number, required: true }, // Số lượng sản phẩm
        }
    ],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true }, // Địa chỉ nhận hàng
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },     // Hình thức thanh toán
    totalPrice: { type: Number, required: true }, 
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'], // Trạng thái đơn hàng
        default: 'Pending' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
