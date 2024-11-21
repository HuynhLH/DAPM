// paymentMethodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
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
    deleteStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSuccess: (state, action) => {
      state.isFetching = false;
      state.paymentMethods = state.paymentMethods.filter(method => method._id !== action.payload);
    },
    deleteFailed: (state) => {
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
  deleteStart,
  deleteSuccess,
  deleteFailed,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;