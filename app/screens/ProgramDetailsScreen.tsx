import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import uuid from "react-native-uuid";
import { DeleteTrainingDay } from "@/utils/FileSystemHelperFunctions";
import { ExerciseDetails } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addEmptyExercise,
  deleteExercise,
  deleteTrainingDay,
} from "@/store/trainingSlice";

export default function ProgramDetailsScreen({ route, navigation }: any) {
  const { parent_id } = route.params;
  const dispatch = useDispatch();

  // Searching by ID and returning the content i.e the exercises of that training day
  const programDetailsArray = useSelector(
    (state: RootState) =>
      state.training.trainingDays.find((day) => day.id == parent_id)?.content
  );

  if (programDetailsArray === undefined) {
    console.log("How is the array not found?");
    return (
      <SafeAreaView className="h-full bg-black">
        <Text className="text-center text-3xl text-red-800">404</Text>
      </SafeAreaView>
    );
  }

  const addExercise = (): void => {
    const emptyExercise: ExerciseDetails = {
      id: uuid.v4().toString(),
      title: "",
      setNum: programDetailsArray.length + 1,
    };

    dispatch(addEmptyExercise({ id: parent_id, emptyExercise }));
  };

  const deleteExerciseById = (exercise_to_delete_id: string): void => {
    dispatch(
      deleteExercise({ currrent_day_id: parent_id, exercise_to_delete_id })
    );
  };

  const deleteDay = async (): Promise<void> => {
    try {
      dispatch(deleteTrainingDay({ idToDelete: parent_id }));
      await DeleteTrainingDay(parent_id);

      navigation.goBack();
    } catch (err) {
      console.error(
        `There was an error executing the deleteDay function in ProgramDetailsScreen!\n${err}`
      );
    }
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300 flex flex-col justify-between p-2">
      <View className="h-[80%] border-2 rounded-2xl p-2">
        <ScrollView>
          {programDetailsArray.map((exercise, index) => (
            <TrainingDayComponent
              key={index}
              id={exercise.id}
              parentId={parent_id}
              title={exercise.title}
              setNum={exercise.setNum}
              icon={MinusIcon}
              onPress={() => deleteExerciseById(exercise.id)}
            />
          ))}
          <TrainingDayComponent
            id=""
            title=""
            icon={PlusIcon}
            isBlank
            onPress={() => addExercise()}
          />
        </ScrollView>
      </View>
      <View className="flex flex-row">
        <TouchableOpacity
          className="flex-1 h-24 bg-red-500 justify-center rounded-3xl border-2 border-gray-500"
          onPress={async () => await deleteDay()}
        >
          <Text className="text-2xl text-center">Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
