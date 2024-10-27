const Product = require('../models/Products');

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

// Lấy danh sách sản phẩm nổi bật
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái sản phẩm nổi bật
exports.updateFeaturedStatus = async (req, res) => {
  try {
    const { isFeatured } = req.body; // Nhận trạng thái isFeatured từ request body
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { isFeatured }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
