import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo async thunk để gọi API tạo địa chỉ giao hàng
export const createShippingAddress = createAsyncThunk(
  'shippingAddress/createShippingAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/shipping-addresses/create', addressData);
      return response.data.shippingAddress;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Tạo async thunk để lấy danh sách địa chỉ giao hàng
export const getShippingAddresses = createAsyncThunk(
  'shippingAddress/getShippingAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shipping-addresses/${userId}`);
      return response.data.shippingAddresses;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Tạo async thunk để cập nhật địa chỉ giao hàng
export const updateShippingAddress = createAsyncThunk(
  'shippingAddress/updateShippingAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shipping-addresses/update/${addressData.id}`, addressData
      );
      return response.data.shippingAddress;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Tạo async thunk để xóa địa chỉ giao hàng
export const deleteShippingAddress = createAsyncThunk(
  'shippingAddress/deleteShippingAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/shipping-addresses/delete/${addressId}`);
      return addressId; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Tạo slice quản lý địa chỉ giao hàng
// Tạo slice quản lý địa chỉ giao hàng
const shippingAddressSlice = createSlice({
    name: 'shippingAddress',
    initialState: {
      shippingAddresses: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createShippingAddress.pending, (state) => {
          state.loading = true;
        })
        .addCase(createShippingAddress.fulfilled, (state, action) => {
          state.loading = false;
          state.shippingAddresses.push(action.payload);
        })
        .addCase(createShippingAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getShippingAddresses.pending, (state) => {
          state.loading = true;
        })
        .addCase(getShippingAddresses.fulfilled, (state, action) => {
          state.loading = false;
          state.shippingAddresses = action.payload;
        })
        .addCase(getShippingAddresses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Xử lý xóa địa chỉ
        .addCase(deleteShippingAddress.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteShippingAddress.fulfilled, (state, action) => {
          state.loading = false;
          // Loại bỏ địa chỉ khỏi danh sách
          state.shippingAddresses = state.shippingAddresses.filter(
            (address) => address.id !== action.payload
          );
        })
        .addCase(deleteShippingAddress.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export default shippingAddressSlice.reducer;
