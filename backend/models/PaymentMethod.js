const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    method: { type: String, required: true }, // Ví dụ: "Credit Card", "MOMO", "COD"
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
