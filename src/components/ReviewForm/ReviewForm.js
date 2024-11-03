import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../redux/reviewSlice';

const ReviewForm = ({ productId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            userId: currentUser.id,  // ID của người dùng hiện tại
            itemId: productId,       // ID sản phẩm
            itemType: 'Product',      // Loại sản phẩm
            rating,
            comment,
        };
        dispatch(addReview(newReview));  // Gửi đánh giá đến Redux
        setRating(1);                     // Reset rating
        setComment('');                   // Reset comment
    };

    if (!currentUser) {
        return <p>Bạn cần đăng nhập để đánh giá sản phẩm!</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Thêm đánh giá</h4>
            <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhận xét của bạn"
            />
            <button type="submit">Gửi đánh giá</button>
        </form>
    );
};

export default ReviewForm;
