import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../utills/constanst";

export const getMe = createAsyncThunk("user/getMe", async () => {
  const { data } = await axios.get(`${backendUrl}/user/me`);
  return data;
});

interface userMe {
  username: string;
  Quizs: Array<any>;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    me: {} as userMe,
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
      state.me = action.payload;
      state.status = "success";
    });
  },
});

export default userSlice.reducer;
