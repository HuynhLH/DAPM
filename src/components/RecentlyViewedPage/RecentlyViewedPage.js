import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addRecentlyViewed } from '../../redux/recentlyViewedSlice';
import './RecentlyViewedPage.css';

const RecentlyViewedPage = () => {
    const dispatch = useDispatch();
    const recentlyViewedItems = useSelector(state => state.recentlyViewed.items);
    
    useEffect(() => {
        const userId = 'USER_ID_CỦA_BẠN'; 
        const fetchRecentlyViewed = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recentlyviewed/${userId}`);
                response.data.forEach(item => {
                    dispatch(addRecentlyViewed(item.product_id)); 
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecentlyViewed();
    }, [dispatch]);

    return (
        <div className="recently-viewed-page">
            <h1>Sản phẩm đã xem</h1>
            <div className="recently-viewed-container">
                {recentlyViewedItems.length > 0 ? (
                    recentlyViewedItems.map(item => (
                        <div className="recently-viewed-card" key={item.product_id}>
                            <img src={item.image_url} alt={item.name} className="recently-viewed-image" />
                            <h3 className="recently-viewed-name">{item.name}</h3>
                            <p className="recently-viewed-price">{item.price} ₫</p>
                            <p className="recently-viewed-description">{item.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Chưa có sản phẩm nào được xem gần đây.</p>
                )}
            </div>
        </div>
    );
};

export default RecentlyViewedPage;
