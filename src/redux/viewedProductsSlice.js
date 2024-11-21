// viewedProductsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    viewedProducts: [],
};
const viewedProductsSlice = createSlice({
    name: 'viewedProducts',
    initialState,
    reducers: {
        addViewedProduct: (state, action) => {
            const exists = state.viewedProducts.find(prod => prod._id === action.payload._id);
            if (!exists) {
                state.viewedProducts.push(action.payload);
            }
        },
        removeViewedProduct: (state, action) => {
            state.viewedProducts = state.viewedProducts.filter(prod => prod._id !== action.payload);
        },
    },
});


export const { addViewedProduct, removeViewedProduct } = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;