// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:5000/api/products/get');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
    await axios.post('http://localhost:5000/api/products/add', newProduct);
    return newProduct; // Return the new product for updating the state
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    return id; // Return the id of the deleted product for updating the state
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload);
            });
    },
});

export default productSlice.reducer;
