import React, { useState } from 'react';

const PaymentMethodForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý thanh toán ở đây, có thể gọi API để thực hiện thanh toán
        alert(`Phương thức thanh toán đã chọn: ${paymentMethod}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input
                        type="radio"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Thẻ tín dụng
                </label>
                <label>
                    <input
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal
                </label>
                {/* Thêm các phương thức thanh toán khác nếu cần */}
            </div>
            <button type="submit">Xác nhận thanh toán</button>
        </form>
    );
};

export default PaymentMethodForm;