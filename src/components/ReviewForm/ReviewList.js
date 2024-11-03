import React from 'react';
import { useSelector } from 'react-redux';

const ReviewList = ({ productId }) => {
    const reviews = useSelector(state => state.reviews.list);

    // Lọc đánh giá cho sản phẩm cụ thể
    const productReviews = reviews.filter(review => review.itemId === productId);

    return (
        <div>
            <h4>Đánh giá của người dùng</h4>
            {productReviews.length === 0 ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                productReviews.map((review) => (
                    <div key={review._id}>
                        <h5>Rating: {review.rating} / 5</h5>
                        <p>{review.comment}</p>
                        <p>Người dùng: {review.userId}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
