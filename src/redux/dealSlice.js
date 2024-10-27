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

// 
export const updateDeal = createAsyncThunk('deals/updateDeal', async ({ id, dealData }) => {
    const response = await axios.put(`http://localhost:5000/api/deals/${id}`, dealData);
    return response.data.deal; // Trả về deal đã được cập nhật
});


export const deleteDeal = createAsyncThunk('deals/deleteDeal', async (id) => {
    await axios.delete(`http://localhost:5000/api/deals/${id}`);
    return id; // Trả về ID của deal đã được xóa
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
            })
            .addCase(fetchDeals.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(fetchDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createDeal.fulfilled, (state, action) => {
                state.deals.push(action.payload); // Thêm deal mới vào danh sách
            })
            .addCase(updateDeal.fulfilled, (state, action) => {
                const index = state.deals.findIndex(deal => deal._id === action.payload._id);
                if (index !== -1) {
                    state.deals[index] = action.payload; // Cập nhật deal trong danh sách
                }
            })
            .addCase(deleteDeal.fulfilled, (state, action) => {
                state.deals = state.deals.filter(deal => deal._id !== action.payload); // Xóa deal khỏi danh sách
            });
    },
});

export default dealsSlice.reducer;
