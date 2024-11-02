import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
    const response = await axios.get('http://localhost:5000/api/deals'); 
    return response.data;
});

export const createDeal = createAsyncThunk('deals/createDeal', async (dealData) => {
    const response = await axios.post('http://localhost:5000/api/deals', dealData);
    return response.data.deal; 
});

export const updateDeal = createAsyncThunk('deals/updateDeal', async ({ id, dealData }) => {
    const response = await axios.put(`http://localhost:5000/api/deals/${id}`, dealData);
    return response.data.deal;
});

export const deleteDeal = createAsyncThunk('deals/deleteDeal', async (id) => {
    await axios.delete(`http://localhost:5000/api/deals/${id}`);
    return id;
});

const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
        deals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeals.pending, (state) => {
                state.loading = true;
                state.error = null; // Đặt lại lỗi khi tải lại
            })
            .addCase(fetchDeals.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(fetchDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createDeal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals.push(action.payload);
            })
            .addCase(createDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateDeal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDeal.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.deals.findIndex(deal => deal._id === action.payload._id);
                if (index !== -1) {
                    state.deals[index] = action.payload;
                }
            })
            .addCase(updateDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteDeal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = state.deals.filter(deal => deal._id !== action.payload);
            })
            .addCase(deleteDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dealsSlice.reducer;
