import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";

const initialData = {
  status: "",
  error: null,
  loader: false,
  // token: "",
};

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (initialUser) => {
    try {
      const response = await axios.post(API_BASE_URL + "login", initialUser);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialData,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.status = "loading";
        state.loader = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loader = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

export const { changeTab } = loginSlice.actions;

export default loginSlice.reducer;
