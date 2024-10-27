const Category = require("../models/Category");

// Lấy tất cả các loại sản phẩm
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm một loại sản phẩm mới
const addCategory = async (req, res) => {
    console.log(req.body); 
    const { name, description } = req.body;
    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: err.message });
    }
};


// Xóa một loại sản phẩm
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Loại sản phẩm đã được xóa thành công");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};
