import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    list: [], 
  },
  reducers: {
    addReview: (state, action) => {
      state.list.push(action.payload); 
    },
    setReviews: (state, action) => {
      state.list = action.payload;  
    },
  },
});

export const { addReview, setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
