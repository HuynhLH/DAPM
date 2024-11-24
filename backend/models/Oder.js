const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },     
            quantity: { type: Number, required: true }, 
        }
    ],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true }, 
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },     
    totalPrice: { type: Number, required: true }, 
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending' 
    },
    itemsPrice: {type: Number, require: true},
    shippingPrice: {type: Number, require: true},
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
