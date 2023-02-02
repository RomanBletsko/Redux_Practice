import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  posts: [],
  status: "idle",
  error: null,
  page: 1,
  totalPages: 0,
  loader: false,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (initialPage) => {
    try {
      const response = await axios.get(
        API_BASE_URL + "posts?page=" + initialPage.page
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.loader = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        state.posts = loadedPosts.data;
        state.totalPages = loadedPosts.total_pages;
        state.loader = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { changeTab } = postsSlice.actions;
export default postsSlice.reducer;
