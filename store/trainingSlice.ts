import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseDetails, TrainingDay, TrainingState } from "./types";
import {
  getCurrentDay,
  getCurrentExercise,
} from "@/utils/TrainingSliceHelperFunctions";

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
        setId?: string;
      }>
    ) => {
      const { id, newTitle, exerciseId, setId } = action.payload;
      const day = getCurrentDay(state.trainingDays, id);
      if (!day) return;
      if (exerciseId) {
        const exercise = day.content.find(
          (exercise) => exercise.id === exerciseId
        );
        if (exercise) {
          if (setId) {
            // Update set title
            const set = exercise.sets?.find((ex) => ex.id === setId);
            if (set) set.title = newTitle;
          } else {
            // Update exercise title
            exercise.title = newTitle;
          }
        }
      } else {
        // Update training day title
        day.title = newTitle;
      }
    },
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
      const day = getCurrentDay(state.trainingDays, action.payload.id);
      if (day) day.content.push(action.payload.emptyExercise);
    },
    deleteExercise: (
      state,
      action: PayloadAction<{
        currrent_day_id: string;
        exercise_to_delete_id: string;
      }>
    ) => {
      const day = getCurrentDay(
        state.trainingDays,
        action.payload.currrent_day_id
      );
      if (!day) return;

      day.content = day.content
        .filter(
          (exercise) => exercise.id !== action.payload.exercise_to_delete_id
        )
        .map((exercise, index) => ({ ...exercise, setNum: index + 1 }));
    },

    //exercise sets logic
    addExerciseSet: (
      state,
      action: PayloadAction<{
        training_day_id: string;
        exercise_index: number;
        newSet: ExerciseDetails;
      }>
    ) => {
      const exercise = getCurrentExercise(
        state.trainingDays,
        action.payload.training_day_id,
        action.payload.exercise_index
      );
      if (!exercise) return;

      if (!exercise.sets) exercise.sets = [];
      exercise.sets.push({
        ...action.payload.newSet,
        setNum: exercise.sets.length + 1,
      });
    },
    deleteExerciseSet: (
      state,
      action: PayloadAction<{
        currrent_day_id: string;
        exercise_index: number;
        set_to_delete_id: string;
      }>
    ) => {
      const exercise = getCurrentExercise(
        state.trainingDays,
        action.payload.currrent_day_id,
        action.payload.exercise_index
      );
      if (!exercise || !exercise.sets) return;

      exercise.sets = exercise.sets
        .filter((set) => set.id !== action.payload.set_to_delete_id)
        .map((set, index) => ({ ...set, setNum: index + 1 }));
    },
    setExerciseSets: (
      state,
      action: PayloadAction<{ training_day_id: string; exercise_index: number }>
    ) => {
      const { training_day_id, exercise_index } = action.payload;
      const exercise = getCurrentExercise(
        state.trainingDays,
        training_day_id,
        exercise_index
      );

      if (!exercise) return;
      if (!exercise.sets) return;
      exercise.sets = [];
    },
    setLastWorkoutSets: (
      state,
      action: PayloadAction<{ training_day_id: string; exercise_index: number }>
    ) => {
      const { training_day_id, exercise_index } = action.payload;
      const exercise = getCurrentExercise(
        state.trainingDays,
        training_day_id,
        exercise_index
      );

      if (!exercise) return;
      if (!exercise.sets) return;
      if (!exercise.lastWorkoutData) exercise.lastWorkoutData = [];

      for (const set of exercise.sets) exercise.lastWorkoutData.push(set.title);
    },
  },
});

export const {
  setTrainingDays,
  addEmptyTrainingDay,
  updateTrainingDayTextInput,
  deleteTrainingDay,
  addEmptyExercise,
  deleteExercise,
  addExerciseSet,
  deleteExerciseSet,
  setExerciseSets,
  setLastWorkoutSets,
} = trainingSlice.actions;
export default trainingSlice.reducer;
