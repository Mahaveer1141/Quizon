import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../utills/constanst";

export const getMe = createAsyncThunk("user/getMe", async () => {
  const { data } = await axios.get(`${backendUrl}/user/me`);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMe.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.status = "success";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
