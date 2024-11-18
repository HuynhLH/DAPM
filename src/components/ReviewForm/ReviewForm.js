import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, deleteReview, fetchReviews } from '../../redux/reviewSlice';
import Rating from 'react-rating-stars-component';
import './ReviewForm.css'; // import CSS file

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  // Redux state selectors
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const reviews = useSelector((state) => state.reviews?.list || []);
  const loading = useSelector((state) => state.reviews?.loading);
  const error = useSelector((state) => state.reviews?.error);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews({ itemId: productId, itemType: 'Product' }));
    }
  }, [productId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Bạn phải đăng nhập để viết đánh giá');
      return;
    }

    if (!rating || !comment) {
      alert('Vui lòng đánh giá và viết nhận xét');
      return;
    }

    const newReview = {
      userId: user._id,
      itemId: productId,
      itemType: 'Product',
      rating,
      comment,
    };

    dispatch(addReview(newReview)).then(() => {
      dispatch(fetchReviews({ itemId: productId, itemType: 'Product' }));
      resetForm();
    });
  };

  const resetForm = () => {
    setRating(1);
    setComment('');
  };

  const handleDelete = (reviewId) => {
    if (user && user._id) {
      dispatch(deleteReview({ reviewId, userId: user._id }));
    }
  };

  const productReviews = reviews.filter(review => review.itemId === productId);

  return (
    <div className="review-container">
      <h4>Đánh Giá Của Người Dùng</h4>
      {productReviews.length === 0 ? (
        <p className="no-reviews">Chưa có đánh giá nào cho sản phẩm này.</p>
      ) : (
        productReviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="rating-container">
              <Rating count={5} size={24} value={review.rating} edit={false} activeColor="#ffd700" />
            </div>
            <p>{review.comment}</p>
            <p className="user-info"><strong>User:</strong> {review.userId && review.userId.username ? review.userId.username : 'Unknown'}</p>
            {review.userId && review.userId._id === user?._id && (
              <div className="review-actions">
                <button onClick={() => handleDelete(review._id)}>Xóa</button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Chỉ hiển thị form viết đánh giá nếu người dùng đã đăng nhập */}
      {user ? (
        <div>
          <h4>Thêm Đánh Giá</h4>
          <form onSubmit={handleSubmit}>
            <div className="rating-container">
              <Rating count={5} size={24} value={rating} activeColor="#ffd700" onChange={(newRating) => setRating(newRating)} />
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Viết nhận xét của bạn" />
            <button type="submit">Gửi Đánh Giá</button>
          </form>
        </div>
      ) : (
        <p className="login-prompt">Bạn phải đăng nhập để viết đánh giá.</p>
      )}
    </div>
  );
};

export default ReviewForm;
