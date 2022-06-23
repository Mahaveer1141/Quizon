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
  response?: string;
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
  reducers: {
    setQuestion: (state, action) => {
      const { index, clicked } = action.payload;
      state.quiz[index].response = clicked;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getQuizById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getQuizById.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getQuizById.fulfilled, (state, action: any) => {
      const newQuiz: quizType[] = [];
      if (action.payload.data?.info) {
        action.payload.data?.info.forEach((question: any) => {
          const demoQuizQuestion = {
            Question: question.Question,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctAns: question.correctAns,
            response: "",
          };
          newQuiz.push(demoQuizQuestion);
        });
        state.quiz = newQuiz;
      } else {
        state.quiz = action.payload.data;
      }
      state.status = "success";
    });
  },
});

export const { setQuestion } = quizSlice.actions;

export default quizSlice.reducer;
