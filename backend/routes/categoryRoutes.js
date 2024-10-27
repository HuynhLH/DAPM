const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Lấy tất cả loại sản phẩm
router.get("/get", getCategories);

// Thêm loại sản phẩm mới
router.post("/add", addCategory);

// Xóa loại sản phẩm
router.delete("/:id", deleteCategory);

module.exports = router;
