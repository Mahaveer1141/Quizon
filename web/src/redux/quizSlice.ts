import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../utills/constanst";

interface quizType {
  Question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAns: string;
}

export const getQuizById = createAsyncThunk(
  "quiz/getQuizById",
  async (id: string) => {
    return axios.get(`${backendUrl}/quizs/quiz/${id}`);
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: [] as quizType[] | any,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getQuizById.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getQuizById.fulfilled, (state, action: any) => {
      state.quiz = action.payload.data;
      state.status = "success";
    });
  },
});

export default quizSlice.reducer;
