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

const useProgramDetails = (parentId: string, navigation: any) => {
  const dispatch = useDispatch();
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
      await DeleteTrainingDay(parentId); //file system function

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
