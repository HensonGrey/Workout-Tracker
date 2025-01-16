import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingDayIndex } from "./types";

const initialState: TrainingDayIndex = {
  index: 0,
};

const progressSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    nextTrainingDay: (state, action: PayloadAction<number>) => {
      state.index = (state.index + 1) % action.payload;
    },
    setTrainingDay: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const { nextTrainingDay, setTrainingDay } = progressSlice.actions;
export default progressSlice.reducer;
