// src/pages/DealsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DealsPage.css'; // Import CSS cho trang Deals

const DealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/deals/get'); // Thay đổi đường dẫn nếu cần
                setDeals(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) {
        return <p>Đang tải sản phẩm...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    return (
        <div className="deals-page">
            <h1>Khuyến mãi đặc biệt</h1>
            <div className="deals-container">
                {deals.map(deal => (
                    <div className="deal-card" key={deal._id}>
                        <img src={deal.image_url} alt={deal.name} className="deal-image" />
                        <h3 className="deal-name">{deal.name}</h3>
                        <p className="deal-description">{deal.description}</p>
                        <p className="deal-price">{deal.price} ₫</p>
                        <button className="deal-button">Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DealsPage;
