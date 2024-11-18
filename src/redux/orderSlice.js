// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setOrderDetails, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
