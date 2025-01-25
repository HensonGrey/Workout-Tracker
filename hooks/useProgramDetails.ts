import { RootState } from "@/store/store";
import { ExerciseDetails } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import {
  addEmptyExercise,
  deleteExercise,
  deleteTrainingDay,
} from "@/store/trainingSlice";
import { DeleteTrainingDay } from "@/utils/FileSystemHelperFunctions";
import { setIndex } from "@/store/progressSlice";

const useProgramDetails = (parentId: string, navigation: any) => {
  const dispatch = useDispatch();

  const index = useSelector((state: RootState) => state.progress.index);
  const length = useSelector(
    (state: RootState) => state.training.trainingDays.length
  ); //number of training days
  const programDetailsArray = useSelector(
    (state: RootState) =>
      state.training.trainingDays.find((day) => day.id == parentId)?.content
  );

  const handleAddExercise = () => {
    if (!programDetailsArray) return;

    const emptyExercise: ExerciseDetails = {
      id: uuid.v4().toString(),
      title: "",
      setNum: programDetailsArray.length + 1,
      sets: [],
    };

    dispatch(addEmptyExercise({ id: parentId, emptyExercise }));
  };

  const handleDeleteExercise = (exerciseId: string): void => {
    dispatch(
      deleteExercise({
        currrent_day_id: parentId,
        exercise_to_delete_id: exerciseId,
      })
    );
  };

  const handleDeleteTrainingDay = async (): Promise<void> => {
    try {
      dispatch(deleteTrainingDay({ idToDelete: parentId })); //redux action
      if (index > 0) dispatch(setIndex(0));
      //resetting if deleting because i dont want to implement the complete logic
      // and realistically the user should be punished for modifying the program mid training week
      await DeleteTrainingDay(parentId, index); //file system function

      navigation.goBack();
    } catch (err) {
      console.error(`Error deleting training day!\n${err}`);
    }
  };

  return {
    programDetailsArray,
    handleAddExercise,
    handleDeleteExercise,
    handleDeleteTrainingDay,
  };
};

export default useProgramDetails;
