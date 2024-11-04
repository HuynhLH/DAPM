import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/paymentSlice';
import './CheckoutPage.css'; 

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    // State variables for recipient details
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [addressType, setAddressType] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    const handlePayment = () => {
        // You can handle payment logic here
        alert(`Thanh toán thành công!\nTên: ${recipientName}\nSĐT: ${recipientPhone}\nLoại địa chỉ: ${addressType}\nĐịa chỉ: ${addressDetail}`);
        dispatch(clearCart()); 
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Thanh Toán</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="checkout-content">
                    <ul className="checkout-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="checkout-item">
                                <img src={item.image_url} alt={item.name} className="checkout-item-image" />
                                <div className="checkout-item-details">
                                    <span className="checkout-item-name">{item.name}</span>
                                    <span className="checkout-item-price">{item.price} VND</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total-price">Tổng tiền: <span className="total-amount">{total} VND</span></h3>

                    {/* Recipient Details Section */}
                    <div className="recipient-details">
                        <h3>Thông tin người nhận</h3>
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            required
                        />
                        <select value={addressType} onChange={(e) => setAddressType(e.target.value)} required>
                            <option value="">Chọn loại địa chỉ</option>
                            <option value="home">Nhà</option>
                            <option value="office">Văn phòng</option>
                            <option value="other">Khác</option>
                        </select>
                        <textarea
                            placeholder="Chi tiết địa chỉ"
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
                            required
                        />
                    </div>

                    <button className="payment-button" onClick={handlePayment}>Xác Nhận Thanh Toán</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
