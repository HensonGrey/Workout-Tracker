import {
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import uuid from "react-native-uuid";
import { DeleteTrainingDay } from "@/utils/FileSystemHelperFunctions";

interface ExerciseDetailsProp {
  id: string;
  setNum: number;
  title: string;
  icon: ImageSourcePropType;
}

export default function ProgramDetailsScreen({ route }: any) {
  const { id } = route.params;
  const [programDetailsArray, setProgramDetailsArray] = useState<
    ExerciseDetailsProp[]
  >([]);

  function addExercise(): void {
    const newExercise: ExerciseDetailsProp = {
      id: uuid.v4().toString(),
      setNum: programDetailsArray.length + 1,
      title: "",
      icon: MinusIcon,
    };

    setProgramDetailsArray((prev) => [...prev, newExercise]);
  }

  function deleteExercise(idToDelete: string): void {
    setProgramDetailsArray((prev) => {
      // First filter out the exercise with the matching ID
      const filteredArray = prev.filter(
        (exercise) => exercise.id !== idToDelete
      );

      // Then update the setNum for all remaining exercises
      return filteredArray.map((exercise, index) => ({
        ...exercise,
        setNum: index + 1,
      }));
    });
  }

  return (
    <SafeAreaView className="h-full bg-zinc-300 flex flex-col justify-between p-2">
      <View className="h-[80%] border-2 rounded-2xl p-2">
        <ScrollView>
          {programDetailsArray.map((exercise) => (
            <TrainingDayComponent
              key={exercise.id} // Changed to use exercise.id instead of index because react did a funny
              title={exercise.title}
              setNum={exercise.setNum}
              icon={MinusIcon}
              onPress={() => deleteExercise(exercise.id)}
            />
          ))}
          <TrainingDayComponent
            title={""}
            icon={PlusIcon}
            isBlank
            onPress={addExercise}
          />
        </ScrollView>
      </View>

      <View className="flex flex-row">
        <TouchableOpacity
          className="flex-1 h-28 bg-red-500 justify-center rounded-3xl border-2 border-gray-500"
          onPress={() => DeleteTrainingDay(id)}
        >
          <Text className="text-2xl text-center">Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-28 bg-green-500 justify-center rounded-3xl border-2 border-gray-500"
          onPress={() => console.log("saving...")}
        >
          <Text className="text-2xl text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
