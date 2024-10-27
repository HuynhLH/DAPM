const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Mapd: {
    type: String,
    default: function () {
      return 'SP' + Math.floor(Math.random() * 10000); 
    },
    unique: true,
  },
  Name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image_url: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
