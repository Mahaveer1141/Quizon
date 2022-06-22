import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
