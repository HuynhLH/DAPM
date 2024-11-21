import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentMethod, fetchPaymentMethods, deletePaymentMethod } from '../../redux/paymentMethodAction';
import './AdminPaymentMethodForm.css';

const AdminPaymentMethodForm = () => {
  const [method, setMethod] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const { paymentMethods, isFetching, error } = useSelector((state) => state.paymentMethod);
  const user = useSelector((state) => state.auth.login.currentUser );

  // Hàm để lấy danh sách phương thức thanh toán
  const getPaymentMethods = async () => {
    console.log("Fetching payment methods...");
    await fetchPaymentMethods(dispatch); 
    console.log("Payment methods fetched.");
  };

  useEffect(() => {
    getPaymentMethods();
  }, [dispatch]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPaymentMethod = { method, description };
    const accessToken = user?.accessToken;

    await createPaymentMethod(newPaymentMethod, dispatch, accessToken);
    await getPaymentMethods(); 
    setMethod(''); 
    setDescription(''); 
  };

  const handleDelete = async (id) => {
    const accessToken = user?.accessToken;
    await deletePaymentMethod(id, dispatch, accessToken);
    await getPaymentMethods(); // Cập nhật lại danh sách sau khi xóa
  };

  return (
    <div className="admin-payment-method-form">
      <h2>Phương Thức Thanh Toán</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="method">Nhập Phương Thức Thanh toán:</label>
          <input
            className="payment-method-input"
            type="text"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Thông Tin:</label>
          <textarea
            className="payment-method-textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isFetching}>
          {isFetching ? 'Adding...' : 'Add Payment Method'}
        </button>
        {error && <p style={{ color: 'red' }}>Đã xảy ra lỗi. Vui lòng thử lại!</p>}
      </form>

      <h3>Danh Sách Phương Thức Thanh Toán</h3>
      <ul>
        {paymentMethods && Array.isArray(paymentMethods) && paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <li key={method._id}>
              {method.method}: {method.description}
              <button1 
                onClick={() => handleDelete(method._id)} 
                className="delete-button1" 
              >
                Xóa
              </button1>
            </li>
          ))
        ) : (
          <p>Không có phương thức thanh toán nào.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPaymentMethodForm;