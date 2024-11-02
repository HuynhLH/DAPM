const Product = require('../models/Products');

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Các sản phẩm nổi bật
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).populate('category');
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured products', error });
  }
};

// Cập nhật trạng thái nổi bật
exports.updateFeaturedStatus = async (req, res) => {
  try {
    const { isFeatured } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { isFeatured }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating featured status', error });
  }
};
