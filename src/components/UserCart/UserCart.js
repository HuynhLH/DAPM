// src/components/UserCart/UserCart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UserCart.css';

const UserCart = () => {
    const navigate = useNavigate(); 
    const cartProducts = useSelector(state => state.carts.products);
    const totalAmount = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

    const handleCheckout = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="user-cart">
            <h1>Giỏ Hàng</h1>
            {cartProducts.length === 0 ? (
                <p>Giỏ hàng của bạn trống.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            className="product-image"
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price * product.quantity} ₫</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Tổng tiền: {totalAmount} ₫</p>

                    <button onClick={handleCheckout}>Thanh Toán</button> 
                </>
            )}
        </div>
    );
};

export default UserCart;
