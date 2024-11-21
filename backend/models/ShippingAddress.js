const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);