const mongoose = require("mongoose");

const recentlyViewedSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    dealid: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
    viewed_at: { type: Date, default: Date.now }
}, { timestamps: true });

const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);
module.exports = RecentlyViewed;
