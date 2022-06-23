import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizManagerReducer from "./quizManagerSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, quizManagerReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    quizManage: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
