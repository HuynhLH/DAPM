// routes/reviewRoutes.js
const express = require("express");
const { createReview, getReviews,deleteReview } = require("../controllers/reviewController");

const router = express.Router();

// Endpoint thêm đánh giá
router.post("/", createReview);

// Endpoint lấy danh sách đánh giá
router.get("/", getReviews);

// Route để xóa review
router.delete('/delete', deleteReview);

module.exports = router;
