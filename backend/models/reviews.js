const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    dealid: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }, // Thêm liên kết với Deal
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },  
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
