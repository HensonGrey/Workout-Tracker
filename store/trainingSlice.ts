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
    updateTrainingDayTextInput: (
      state,
      action: PayloadAction<{
        id: string;
        newTitle: string;
        exerciseId?: string;
      }>
    ) => {
      const { id, newTitle, exerciseId } = action.payload;
      const day = state.trainingDays.find((day) => day.id == id);
      if (exerciseId !== undefined && day) {
        const editedExerciseTitle = day.content.find(
          (exercise) => exercise.id == exerciseId
        );
        if (editedExerciseTitle) editedExerciseTitle.title = newTitle;
      } else if (day) {
        day.title = newTitle;
      }
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
    addEmptyExercise: (
      state,
      action: PayloadAction<{ id: string; emptyExercise: ExerciseDetails }>
    ) => {
      const { id, emptyExercise } = action.payload;
      const currentTrainingDay = state.trainingDays.find((day) => day.id == id);

      if (currentTrainingDay === undefined)
        return console.error(
          `Current training day is undefined. Function is in trainingSlice -> addEmptyExercise`
        );

      currentTrainingDay.content = [
        ...currentTrainingDay.content,
        emptyExercise,
      ];
    },
    deleteExercise: (
      state,
      action: PayloadAction<{
        currrent_day_id: string;
        exercise_to_delete_id: string;
      }>
    ) => {
      const { currrent_day_id, exercise_to_delete_id } = action.payload;
      const currentDay = state.trainingDays.find(
        (day) => day.id == currrent_day_id
      );

      if (currentDay === undefined)
        return console.error(
          `Current training day is undefined. Function is in trainingSlice -> deleteExercise`
        );

      currentDay.content = currentDay.content.filter(
        (exercise) => exercise.id !== exercise_to_delete_id
      );

      currentDay.content = currentDay.content.map((exercise, index) => ({
        ...exercise,
        setNum: index + 1,
      }));
    },
  },
});

export const {
  setTrainingDays,
  addEmptyTrainingDay,
  updateTrainingDayTextInput,
  updateTrainingDayContent,
  deleteTrainingDay,
  addEmptyExercise,
  deleteExercise,
} = trainingSlice.actions;
export default trainingSlice.reducer;
