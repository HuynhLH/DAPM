// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMethod: 'Credit Card',
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPaymentMethod, setLoading, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
