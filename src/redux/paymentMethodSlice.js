// paymentMethodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentMethodSlice = createSlice({
  name: 'paymentMethod', // Tên của slice phải giống với cái bạn truy cập trong useSelector
  initialState: {
    paymentMethods: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.paymentMethods = action.payload;
    },
    fetchFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createSuccess: (state, action) => {
      state.isFetching = false;
      state.paymentMethods.push(action.payload);
    },
    createFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailed,
  createStart,
  createSuccess,
  createFailed,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
