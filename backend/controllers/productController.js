
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
