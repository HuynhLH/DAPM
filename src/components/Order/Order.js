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

  const { cartItems, selectedShippingAddress, selectedPaymentMethod } = location.state || { 
    cartItems: [], 
    selectedShippingAddress: null, 
    selectedPaymentMethod: null 
  };

  const [orderData, setOrderData] = useState({
    items: cartItems,
    shippingAddress: selectedShippingAddress,
    paymentMethod: selectedPaymentMethod,
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...orderData, userId: user._id }));
    setOrderData({ items: [], paymentMethod: '', shippingAddress: {} });
    navigate('/order-success');
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChangeAddress = () => {
    navigate('/shipping', { state: { fromOrderPage: true } });
  };

  const handleChangePayment = () => {
    navigate('/shipping', { state: { fromOrderPage: true } });
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Xác Nhận Đơn Hàng</h1>
      
      {/* Shipping Address Section */}
      <div className="shipping-address">
        <h2 className="hh">Địa chỉ nhận hàng</h2>
        <p>{selectedShippingAddress?.phoneNumber}</p>
        <p>{selectedShippingAddress?.address}, {selectedShippingAddress?.district}, {selectedShippingAddress?.ward}, {selectedShippingAddress?.city}</p>
        <button className="change-button" onClick={handleChangeAddress}>Thay đổi</button>
      </div>

      {/* Payment Method Section */}
      <div className="payment-method">
        <h2 className="hh">Phương thức thanh toán</h2>
        <p>{selectedPaymentMethod ? `Phương thức: ${selectedPaymentMethod.method} : ${selectedPaymentMethod.description}` : 'Chưa chọn phương thức thanh toán'}</p>
        <button className="change-button" onClick={handleChangePayment}>Thay đổi</button>
      </div>

      {/* Order Items Section */}
      <div className="order-items">
        <h2 className="hh">Thông tin sản phẩm</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="order-item">
              <img src={item.image_url} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.quantity} x {item.price.toLocaleString('vi-VN')} đ</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary Section */}
      <div className="order-summary">
        <h2 className="hh">Đơn hàng</h2>
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
