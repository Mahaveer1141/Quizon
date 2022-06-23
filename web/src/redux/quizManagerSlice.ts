import { createSlice } from "@reduxjs/toolkit";

const quizManagerSlice = createSlice({
  name: "quiz",
  initialState: {
    index: 0,
    countTimer: 180,
    completed: false,
    score: 0,
  },
  reducers: {
    setCountTimer: (state, action) => {
      state.countTimer = action.payload;
    },
    setIndex: (state) => {
      state.index++;
    },
    setScore: (state) => {
      state.score++;
    },
    setCompleted: (state) => {
      state.completed = true;
    },
  },
});

export const { setCompleted, setCountTimer, setIndex, setScore } =
  quizManagerSlice.actions;

export default quizManagerSlice.reducer;
