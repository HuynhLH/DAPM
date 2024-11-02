const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    is_featured: { type: Boolean, default: true }
}, { timestamps: true });

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);
module.exports = FeaturedProduct;
