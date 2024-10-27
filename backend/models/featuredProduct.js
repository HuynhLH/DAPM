const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    is_featured: { type: Boolean, default: true },
});

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);

module.exports = FeaturedProduct;
