import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import uuid from "react-native-uuid";
import { DeleteTrainingDay } from "@/utils/FileSystemHelperFunctions";
import { ExerciseDetails } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ProgramDetailsScreen({ route }: any) {
  const { id } = route.params;
  const dispatch = useDispatch();

  // Searching by ID and returning the content i.e the exercises of that training day
  const programDetailsArray = useSelector(
    (state: RootState) =>
      state.training.trainingDays.find((day) => day.id == id)?.content
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
    const newExercise: ExerciseDetails = {
      id: uuid.v4().toString(),
      title: "",
      setNum: programDetailsArray.length + 1,
    };
  };

  const deleteExercise = (id: string): void => {};

  return (
    <SafeAreaView className="h-full bg-zinc-300 flex flex-col justify-between p-2">
      <View className="h-[80%] border-2 rounded-2xl p-2">
        <ScrollView>
          {programDetailsArray.map((exercise, index) => (
            <TrainingDayComponent
              key={index}
              id={exercise.id}
              title={exercise.title}
              setNum={exercise.setNum}
              icon={MinusIcon}
              onPress={() => deleteExercise(exercise.id)}
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
