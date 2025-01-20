import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseDetails, NextTrainingDay } from "./types";

const initialState: NextTrainingDay = {
  index: 0,
  id: "",
  title: "",
  exercises: [],
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    nextTrainingDay: (state, action: PayloadAction<number>) => {
      // If we're at the last index and a day was deleted,
      // we want to go back to the first day
      if (state.index >= action.payload) {
        state.index = 0;
      } else {
        state.index = (state.index + 1) % action.payload;
      }
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setTrainingDayId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setTrainingTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setExercises: (state, action: PayloadAction<ExerciseDetails[]>) => {
      state.exercises = action.payload;
    },
  },
});

export const {
  nextTrainingDay,
  setIndex,
  setTrainingDayId,
  setTrainingTitle,
  setExercises,
} = progressSlice.actions;
export default progressSlice.reducer;
