import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseDetails, TrainingDay, TrainingState } from "./types";

const initialState: TrainingState = {
  trainingDays: [],
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    //Training day functionality
    setTrainingDays: (state, action: PayloadAction<TrainingDay[]>) => {
      state.trainingDays = action.payload;
    },
    addEmptyTrainingDay: (state, action: PayloadAction<TrainingDay>) => {
      state.trainingDays.push(action.payload);
    },
    updateTrainingDayTitle: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;
      const day = state.trainingDays.find((day) => day.id == id);
      if (day) day.title = newTitle;
    },
    updateTrainingDayContent: () => {},
    deleteTrainingDay: (
      state,
      action: PayloadAction<{ idToDelete: string }>
    ) => {
      state.trainingDays = state.trainingDays.filter(
        (prev) => prev.id !== action.payload.idToDelete
      );
    },

    //Excercises functionallity
    // addEmptyExercise: (state, action: PayloadAction<ExerciseDetails>) => {}
  },
});

export const {
  setTrainingDays,
  addEmptyTrainingDay,
  updateTrainingDayTitle,
  updateTrainingDayContent,
  deleteTrainingDay,
} = trainingSlice.actions;
export default trainingSlice.reducer;
