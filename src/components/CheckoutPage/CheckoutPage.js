import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/paymentSlice';
import './CheckoutPage.css'; 

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    const handlePayment = () => {
        alert("Thanh toán thành công!");
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
                    <button className="payment-button" onClick={handlePayment}>Xác Nhận Thanh Toán</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
