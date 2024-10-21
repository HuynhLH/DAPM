const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    Mapd: String,
    Name: String,
    description: String,
    price: Number,
    image_url: String,
    category_id: Number,
    created_at: Date,
    updated_at: Date,
  });

module.exports = mongoose.model('Product', productSchema);