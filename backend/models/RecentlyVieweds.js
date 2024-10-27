const mongoose = require("mongoose");

const recentlyViewedSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    viewed_at: { type: Date, default: Date.now },
});

const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);

module.exports = RecentlyViewed;
