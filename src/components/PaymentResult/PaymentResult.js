import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import './PaymentResult.css'; 

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resultCode = queryParams.get('resultCode');
  const message = queryParams.get('message');
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (resultCode === '0') {
      dispatch(clearCart());
      localStorage.removeItem('cart');
    }
  }, [resultCode, dispatch]);

  return (
    <div className="payment-result-container">
      <h1>Kết quả thanh toán</h1>
      {resultCode === '0' ? (
        <p className="payment-result-success">Thanh toán thành công! 🎉</p>
      ) : (
        <p className="payment-result-failure">Thanh toán thất bại. 😢</p>
      )}
      <p className="payment-result-message">Thông báo từ MoMo: {message}</p>
      <a href="/" className="payment-result-back-link">Quay lại trang chủ</a>
    </div>
  );
};

export default PaymentResult;
