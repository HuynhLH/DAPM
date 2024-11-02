const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Mapd: {
        type: String,
        default: function () { return 'SP' + Math.floor(Math.random() * 10000); },
        unique: true,
    },
    Name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image_url: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    colors: [{ type: String }],  
    sizes: [{ type: String }],   
    brand: { type: String }, 
    isFeatured: { type: Boolean, default: false }
  }, { timestamps: true });
  

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
