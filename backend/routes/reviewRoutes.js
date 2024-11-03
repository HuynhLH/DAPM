// routes/reviewRoutes.js
const express = require("express");
const { createReview, getReviews } = require("../controllers/reviewController");

const router = express.Router();

// Endpoint thêm đánh giá
router.post("/", createReview);

// Endpoint lấy danh sách đánh giá
router.get("/", getReviews);

module.exports = router;
