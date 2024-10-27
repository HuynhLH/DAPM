import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/api/categories/get');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
  const response = await axios.post('http://localhost:5000/api/categories/add', newCategory);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    return id;
  });

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
