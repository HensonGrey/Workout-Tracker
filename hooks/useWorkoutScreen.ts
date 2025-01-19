import { RootState } from "@/store/store";
import { ExerciseDetails, TrainingDay } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import { addExerciseSet, deleteExerciseSet } from "@/store/trainingSlice";

export const useWorkout = (route: any) => {
  const { id, exercises } = route.params;
  const dispatch = useDispatch();
  const exercise_index = useSelector(
    (state: RootState) => state.counterSlice.exercise_index
  );
  const currentExercise = useSelector((state: RootState) => {
    const day = state.training.trainingDays.find(
      (day: TrainingDay) => day.id === id
    );
    return day ? day.content[exercise_index] : null;
  });

  if (!currentExercise) {
    throw new Error("Exercise doesnt exist!");
  }

  const addSet = () => {
    const newSet: ExerciseDetails = {
      id: uuid.v4().toString(),
      title: ``,
      setNum: (currentExercise.sets?.length || 0) + 1,
    };

    dispatch(
      addExerciseSet({
        training_day_id: id,
        exercise_index,
        newSet,
      })
    );
  };

  const removeSet = (set_id: string) => {
    dispatch(
      deleteExerciseSet({
        currrent_day_id: id,
        exercise_index,
        set_to_delete_id: set_id,
      })
    );
  };

  const completeWorkout = () => {};

  const skipWorkout = () => {};

  return {
    currentExercise,
    exercises,
    exercise_index,
    addSet,
    removeSet,
    completeWorkout,
    skipWorkout,
  };
};
