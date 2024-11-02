import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentlyViewed, addRecentlyViewed } from '../../redux/recentlyViewedSlice';
import './recentlyViewed.css'; 

const RecentlyViewedComponent = ({ id }) => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.recentlyViewed);

    useEffect(() => {
        if (id) {  // Kiểm tra xem userId có hợp lệ không
            console.log('Fetching recently viewed for userId:', id); // Log userId
            dispatch(fetchRecentlyViewed(id));
        } else {
            console.error('Invalid userId:', id); // Log lỗi khi userId không hợp lệ
        }
    }, [id, dispatch]);

    const handleAddRecentlyViewed = (product) => {
        dispatch(addRecentlyViewed(product));
    };

    return (
        <div className="recently-viewed-container">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            <h2 className="recently-viewed-title">Recently Viewed Products</h2>
            <div className="recently-viewed-list">
                {items.map(item => (
                    <div className="recently-viewed-item" key={item.productid._id}>
                        <p>{item.productid.name}</p> {/* Hiển thị tên sản phẩm */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedComponent;
