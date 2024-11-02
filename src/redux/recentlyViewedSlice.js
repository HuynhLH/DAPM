import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa một async thunk để lấy sản phẩm đã xem gần đây
export const fetchRecentlyViewed = createAsyncThunk(
    'recentlyViewed/fetchRecentlyViewed',
    async (id) => {
        const response = await axios.get(`http://localhost:5000/api/recentlyviewed/${id}`);
        return response.data;
    }
);

const recentlyViewedSlice = createSlice({
    name: 'recentlyViewed',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Bạn có thể thêm các reducer khác nếu cần
        addRecentlyViewed: (state, action) => {
            state.items.push(action.payload);
        },
        clearRecentlyViewed: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentlyViewed.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRecentlyViewed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export các action và reducer
export const { addRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
