
import { createSlice } from '@reduxjs/toolkit';

const recentlyViewedSlice = createSlice({
    name: 'recentlyViewed',
    initialState: {
        items: [],
    },
    reducers: {
        addRecentlyViewed: (state, action) => {
            const item = action.payload;
            if (!state.items.find(i => i.product_id === item.product_id)) {
                state.items.push(item);
            }
        },
        clearRecentlyViewed: (state) => {
            state.items = [];
        },
    },
});

export const { addRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
