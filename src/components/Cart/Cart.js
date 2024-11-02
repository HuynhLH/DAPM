import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/cartSlice';
import './Cart.css'; // Đừng quên import CSS

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const isAuthenticated = useSelector(state => state.auth.login.currentUser);

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h2>Giỏ Hàng</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image_url} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">{item.price} VND</span>
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total-price">Tổng tiền: {total} VND</h3>
                    <button className="clear-cart-button" onClick={handleClear}>Xóa toàn bộ</button>
                </>
            )}
        </div>
    );
};

export default Cart;
