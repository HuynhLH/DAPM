import axios from 'axios';
import {
  fetchStart,
  fetchSuccess,
  fetchFailed,
  createStart,
  createSuccess,
  createFailed,
} from './paymentMethodSlice';

// Hàm lấy danh sách PaymentMethod từ backend
export const fetchPaymentMethods = async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get('http://localhost:5000/api/payment-methods');
    dispatch(fetchSuccess(res.data.paymentMethods));
  } catch (error) {
    console.error('Error fetching payment methods:', error.response?.data?.message || error.message);
    dispatch(fetchFailed());
  }
};

// Hàm thêm mới PaymentMethod
export const createPaymentMethod = async (paymentMethod, dispatch, accessToken) => {
    dispatch(createStart());
    try {
      const res = await axios.post(
        'http://localhost:5000/api/payment-methods/create',
        paymentMethod,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      dispatch(createSuccess(res.data.paymentMethod)); 
    } catch (error) {
      console.log('Access Token:', accessToken);
      console.error('Lỗi khi tạo phương thức thanh toán:', error.response ? error.response.data : error.message);
      dispatch(createFailed()); // Xử lý lỗi
    }
  };
