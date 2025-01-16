import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ExerciseDetails } from "@/store/types";
import { useTrainingData } from "@/hooks/useTrainingData";
import TrainingDayComponent from "@/components/TrainingDayComponent";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const currentTrainingDayIndex = useSelector(
    (state: RootState) => state.progressReducer.index
  );
  const trainingDay = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  const [trainingDayTitle, setTrainingDayTitle] = useState<string>();
  const [exercisesToDisplay, setExercisesToDisplay] =
    useState<ExerciseDetails[]>();

  const { isLoading } = useTrainingData();

  useEffect(() => {
    if (!isLoading && trainingDay.length > 0) {
      setTrainingDayTitle(trainingDay[currentTrainingDayIndex].title);
      setExercisesToDisplay(trainingDay[currentTrainingDayIndex].content);
    }
  }, [isLoading, trainingDay, currentTrainingDayIndex]);

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-zinc-300">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex flex-1 flex-col bg-slate-500 h-full">
      <View className="flex-[6] border-2 border-white rounded-2xl p-2 mb-10">
        <Text className="text-3xl text-purple-200 text-center p-4">
          {trainingDayTitle}
        </Text>
        <ScrollView>
          {exercisesToDisplay ? (
            exercisesToDisplay.map((exercise) => (
              <TrainingDayComponent
                id={exercise.id}
                title={exercise.title}
                onPress={() => {}}
              />
            ))
          ) : (
            <SafeAreaView></SafeAreaView>
          )}
        </ScrollView>
      </View>

      <View className="flex-[1] flex flex-row">
        <TouchableOpacity
          className="flex-[1] justify-center bg-slate-600 rounded-t-2xl border-r-2"
          onPress={() => navigation.navigate("Program")}
        >
          <Text className="text-center text-2xl color-white">program</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-[1] justify-center bg-slate-600 rounded-t-2xl">
          <Text className="text-center text-2xl color-white">start</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-[1] justify-center bg-slate-600 rounded-t-2xl border-l-2">
          <Text className="text-center text-2xl color-white">history</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
