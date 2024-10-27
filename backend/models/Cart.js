const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    products: [{ product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number } }],
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
