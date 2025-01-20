import { RootState } from "@/store/store";
import {
  ExerciseDetails,
  ExerciseDetailsHistory,
  TrainingDay,
  TrainingDayHistoryObject,
} from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import {
  addExerciseSet,
  clearLastWorkoutSets,
  deleteExerciseSet,
  setExerciseSets,
  setLastWorkoutSets,
} from "@/store/trainingSlice";
import { nextTrainingDay } from "@/store/progressSlice";
import {
  FinishedWorkout,
  SaveNameChanges,
} from "@/utils/FileSystemHelperFunctions";
import { resetCounter } from "@/store/counterSlice";

interface WorkoutRouteProps {
  id: string;
  title: string;
  exercises: ExerciseDetails[];
}

export const useWorkout = (route: { params: WorkoutRouteProps }) => {
  const { id, title, exercises } = route.params;
  const dispatch = useDispatch();

  const exercise_index = useSelector(
    (state: RootState) => state.counter.exercise_index
  );

  const all_training_days = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  const current_training_day_index = useSelector(
    (state: RootState) => state.progress.index
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

  const completeWorkout = async () => {
    try {
      const historyObject: TrainingDayHistoryObject = {
        id,
        date: new Date(Date.now()),
        training_day_title: title,
        exercises_performed: [],
      };

      // Create history records first
      exercises.forEach((exercise) => {
        const exerciseInformation: ExerciseDetailsHistory = {
          exercise_title: exercise.title,
          sets_performed_titles: exercise.sets?.map((set) => set.title) || [],
        };
        historyObject.exercises_performed.push(exerciseInformation);
      });

      //clearing last workout data for this exercise
      exercises.forEach((lastW, index) => {
        if (lastW.lastWorkoutData)
          dispatch(
            clearLastWorkoutSets({ training_day_id: id, exercise_index: index })
          );
      });

      //setting the last workout field of this exercise -> mapped from exercise.sets.titles
      exercises.forEach((_, index) => {
        dispatch(
          setLastWorkoutSets({
            training_day_id: id,
            exercise_index: index,
          })
        );
      });

      // Clear sets for each exercise using the reducer action
      exercises.forEach((_, index) => {
        dispatch(
          setExerciseSets({
            training_day_id: id,
            exercise_index: index,
          })
        );
      });

      //calculating the next index to save
      const nextIndex =
        (current_training_day_index + 1) % all_training_days.length;
      // Update training day index in redux
      dispatch(nextTrainingDay(all_training_days.length));

      dispatch(resetCounter());

      //await SaveNameChanges(all_training_days, nextIndex, historyObject)

      // Save changes to file system
      await FinishedWorkout(all_training_days, nextIndex);
    } catch (err) {
      console.error(`Error completing the workout\n${err}`);
    }
  };

  const skipWorkout = async () => {
    try {
      const historyObject: TrainingDayHistoryObject = {
        id,
        date: new Date(Date.now()),
        training_day_title: title,
        exercises_performed: [],
      };

      //clearing last workout data for each exercise
      exercises.forEach((lastW, index) => {
        if (lastW.lastWorkoutData)
          dispatch(
            clearLastWorkoutSets({ training_day_id: id, exercise_index: index })
          );
      });

      // Clear sets for each exercise using the reducer action
      exercises.forEach((_, index) => {
        dispatch(
          setExerciseSets({
            training_day_id: id,
            exercise_index: index,
          })
        );
      });

      //calculating the next index to save
      const nextIndex =
        (current_training_day_index + 1) % all_training_days.length;
      // Update training day index in redux
      dispatch(nextTrainingDay(all_training_days.length));

      dispatch(resetCounter());

      await FinishedWorkout(all_training_days, nextIndex, historyObject);
    } catch (err) {
      console.error(`Error skipping this workout\n${err}`);
    }
  };

  return {
    id,
    currentExercise,
    exercises,
    exercise_index,
    addSet,
    removeSet,
    completeWorkout,
    skipWorkout,
  };
};
