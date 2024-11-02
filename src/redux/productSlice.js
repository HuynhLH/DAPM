import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:5000/api/products/get');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
    await axios.post('http://localhost:5000/api/products/add', newProduct);
    return newProduct; 
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    return id; 
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updatedData }) => {
    const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedData);
    return response.data; 
});

export const updateFeaturedProduct = createAsyncThunk('products/updateFeaturedProduct', async ({ id, isFeatured }) => {
    const response = await axios.put(`http://localhost:5000/api/products/featured/${id}`, { isFeatured });
    return response.data; 
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
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateFeaturedProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;
