import { configureStore } from "@reduxjs/toolkit";
import trainingReducer from "./trainingSlice";
import progressReducer from "./progressSlice";
import counterSlice from "./counterSlice";

export const store = configureStore({
  reducer: {
    training: trainingReducer,
    progressReducer,
    counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
