// src/components/AdminCartManager/AdminCartManager.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, clearCart } from '../../redux/cartSlice';

const AdminCartManager = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.carts.products);
    
    useEffect(() => {
        
    }, []);

    const deleteProduct = (productId) => {
        dispatch(removeProduct(productId));
    };

    const clearAllCarts = () => {
        dispatch(clearCart());
    };

    return (
        <div className="admin-cart-manager">
            <h1>Quản Lý Giỏ Hàng</h1>
            {cartProducts.length === 0 ? (
                <p>Giỏ hàng trống.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Tên Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => deleteProduct(product._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={clearAllCarts}>Xóa Tất Cả</button>
        </div>
    );
};

export default AdminCartManager;
