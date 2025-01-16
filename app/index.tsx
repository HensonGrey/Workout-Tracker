import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTrainingData } from "@/hooks/useTrainingData";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import {
  nextTrainingDay,
  setExercises,
  setTrainingTitle,
} from "@/store/progressSlice";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { index, title, exercises } = useSelector(
    (state: RootState) => state.progressReducer
  );
  const trainingDay = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  const { isLoading } = useTrainingData();

  useEffect(() => {
    if (!isLoading && trainingDay.length > 0) {
      // Get current training day data (safely)
      const currentIndex = index >= trainingDay.length ? 0 : index;
      const currentDay = trainingDay[currentIndex];

      // Always update both title and exercises to keep in sync
      dispatch(setTrainingTitle(currentDay.title));
      dispatch(setExercises(currentDay.content));
    } else if (trainingDay.length === 0) {
      // If no training days left, clear the progress data
      dispatch(setTrainingTitle(""));
      dispatch(setExercises([]));
    }
  }, [isLoading, trainingDay, index]);
  return (
    <SafeAreaView className="flex flex-1 flex-col bg-slate-500 h-full">
      <View className="flex-[6] border-2 border-white rounded-2xl p-2 mb-10">
        <Text className="text-3xl text-purple-200 text-center p-4">
          {title}
        </Text>
        <ScrollView>
          {exercises ? (
            exercises.map((exercise, index) => (
              <TrainingDayComponent
                key={index}
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
