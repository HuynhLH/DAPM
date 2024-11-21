import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../redux/orderSlice';
import './Order.css';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const { cartItems, address } = location.state || { cartItems: [], address: null };

    const [orderData, setOrderData] = useState({
        items: cartItems,
        shippingAddress: address,
    });
    const handleCreateOrder = (e) => {
        e.preventDefault();
        dispatch(createOrder({ ...orderData, userId: user._id }));
        setOrderData({ items: [], paymentMethod: '', shippingAddress: {} });
        navigate('/order-success'); 
    };
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="order-container">
            <h1 className="order-title">Xác Nhận Đơn Hàng</h1>
            <div className="shipping-address">
                <h2 className='hh'>Địa chỉ nhận hàng</h2>
                <p>{address?.phoneNumber}</p>
                <p>{address?.address}, {address?.district}, {address?.ward}, {address?.city}</p>
            </div>

            {/* Order Items */}
            <div className="order-items">
                <h2 className='hh'>Thông tin sản phẩm</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} className="order-item">
                            <img src={item.image_url} alt={item.name} />
                            <p>{item.name}{item.Name}</p>
                            <p>{item.quantity} x {item.price.toLocaleString('vi-VN')} đ</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Order Summary */}
            <div className="order-summary">
                <h2 className='hh'>Đơn hàng</h2>
                <div className="order-summary-item">
                    <span>Tạm tính</span>
                    <span>{total.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="order-summary-item">
                    <span>Thành tiền (Đã VAT)</span>
                    <span>{total.toLocaleString('vi-VN')} đ</span>
                </div>
            </div>

            {/* Place Order Button */}
            <button onClick={handleCreateOrder} className="order-button">Đặt hàng</button>
        </div>
    );
};

export default Order;
