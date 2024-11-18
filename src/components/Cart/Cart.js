import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, loadCart, updateItemQuantity } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    useEffect(() => {
        const storedCart = loadCartFromLocalStorage();
        dispatch(loadCart(storedCart)); 
      }, [dispatch]);
      
      const loadCartFromLocalStorage = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
      };
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems)); 
      }, [cartItems]);

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
        } else if (newQuantity === 0) {
            dispatch(removeFromCart(item)); 
        }
    };    

    const handleClear = () => {
        dispatch(clearCart());
    };
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
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
                                <span className="cart-item-name">{item.name || item.Name || 'Sản phẩm không có tên'}</span>
                                    <span className="cart-item-price">{item.price.toLocaleString('vi-VN')} VND</span>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
                                        <span className="item-quantity">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="total-price">Tổng tiền: {total.toLocaleString('vi-VN')} VND</h3>
                    <button className="clear-cart-button" onClick={handleClear}>Xóa toàn bộ</button>
                    <Link to="/shipping">
                        <button className="checkout-button">Thanh Toán</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Cart;
