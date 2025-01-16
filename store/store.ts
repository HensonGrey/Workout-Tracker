import { configureStore } from "@reduxjs/toolkit";
import trainingReducer from "./trainingSlice";
import progressReducer from "./progressSlice";

export const store = configureStore({
  reducer: {
    training: trainingReducer,
    progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
