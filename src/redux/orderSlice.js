// src/redux/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để tạo đơn hàng
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', orderData);
      return response.data.order; // Trả về đơn hàng mới được tạo
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk để lấy danh sách đơn hàng của người dùng
export const fetchOrdersByUser  = createAsyncThunk(
  'order/fetchOrdersByUser ',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      return response.data.orders; // Trả về danh sách đơn hàng
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk để cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status });
      return response.data.order; // Trả về đơn hàng đã được cập nhật
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Tạo slice cho đơn hàng
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    // Xử lý tạo đơn hàng
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Thêm đơn hàng mới vào danh sách
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu thông báo lỗi
      });

    // Xử lý lấy danh sách đơn hàng
    builder
      .addCase(fetchOrdersByUser .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUser .fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Cập nhật danh sách đơn hàng
      })
      .addCase(fetchOrdersByUser .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu thông báo lỗi
      });

    // Xử lý cập nhật trạng thái đơn hàng
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload; // Cập nhật đơn hàng đã được thay đổi
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu thông báo lỗi
      });
  },
});

// Xuất các action và reducer
export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;