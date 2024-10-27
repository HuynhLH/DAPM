import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import './DealsPage.css';

const DealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/deals');
                setDeals(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const handleAddToCart = (deal) => {
        dispatch(addProduct(deal)); 
    };

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    return (
        <div className="deals-page">
            <h1>Các sản phẩm</h1>
            <div className="deals-container">
                {deals.map(deal => (
                    <div className="deal-card" key={deal._id}>
                        <img src={deal.image_url} alt={deal.name} className="deal-image" />
                        <h3 className="deal-name">{deal.name}</h3>
                        <p className="deal-description">{deal.description}</p>
                        <p className="deal-price">{deal.price} ₫</p>
                        <p className="deal-discount">Giảm giá: {deal.discount || 0} %</p> 
                        <p className="deal-status">Tình trạng: {deal.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}</p> {/* Hiển thị tình trạng */}
                        <button 
                            className="deal-button" 
                            onClick={() => handleAddToCart(deal)} 
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealsPage;
