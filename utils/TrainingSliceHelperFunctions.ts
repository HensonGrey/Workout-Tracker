import { ExerciseDetails, TrainingDay } from "@/store/types";

export const getCurrentDay = (
  trainingDays: TrainingDay[],
  id: string
): TrainingDay | null => {
  return trainingDays.find((day) => day.id === id) || null;
};

export const getCurrentExercise = (
  trainingDays: TrainingDay[],
  day_id: string,
  exercise_index: number
): ExerciseDetails | null => {
  return getCurrentDay(trainingDays, day_id)?.content[exercise_index] || null;
};
