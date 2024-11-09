// src/redux/productDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        productDetail: null,
        loading: false,
        error: null,
    },
    reducers: {
        setProductDetail: (state, action) => {
            state.productDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearProductDetail: (state) => {
            state.productDetail = null;
            state.error = null;
        },
    },
});

export const { setProductDetail, setLoading, setError, clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
