import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy danh sách đánh giá
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ itemId, itemType }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/reviews', {
        params: { itemId, itemType }, // Gửi itemId và itemType qua query string
      });
      return response.data; // API trả về danh sách đánh giá
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Thunk để thêm đánh giá mới
export const addReview = createAsyncThunk('reviews/addReview', async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/reviews', reviewData); // reviewData chứa userId, itemId, itemType, rating, comment
    return response.data.review;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Thunk để xóa đánh giá
export const deleteReview = createAsyncThunk('reviews/deleteReview', async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.delete('http://localhost:5000/reviews/delete', { data: reviewData }); // reviewData chứa reviewId và userId
    return reviewData.reviewId; 
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    list: [],
    loading: false,
    error: null,
    addReviewStatus: 'idle', // Trạng thái cho việc thêm review
    deleteReviewStatus: 'idle', // Trạng thái cho việc xóa review
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch reviews
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add review
    builder
      .addCase(addReview.pending, (state) => {
        state.addReviewStatus = 'loading';
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.addReviewStatus = 'succeeded';
        state.list.push(action.payload); // Thêm review mới vào danh sách
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addReviewStatus = 'failed';
        state.error = action.payload;
      });

    // Delete review
    builder
      .addCase(deleteReview.pending, (state) => {
        state.deleteReviewStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteReviewStatus = 'succeeded';
        state.list = state.list.filter((review) => review._id !== action.payload); // Lọc review đã xóa khỏi danh sách
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteReviewStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
