import { createSlice } from "@reduxjs/toolkit";

const initialState: { exercise_index: number } = {
  exercise_index: 0, //index of exercise i.e trainingDay[index]
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.exercise_index++;
    },
    decrementCounter: (state) => {
      state.exercise_index--;
    },
    resetCounter: (state) => {
      state.exercise_index = 0;
    },
  },
});

export const { incrementCounter, decrementCounter, resetCounter } =
  counterSlice.actions;
export default counterSlice.reducer;
