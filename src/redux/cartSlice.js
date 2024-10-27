import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            const productIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (productIndex >= 0) {
                state.products[productIndex].quantity += action.payload.quantity;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        updateProductQuantity: (state, action) => {
            const productIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (productIndex >= 0) {
                state.products[productIndex].quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.products = [];
        },
    },
});

export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
