import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTrainingData } from "@/hooks/useTrainingData";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import {
  setExercises,
  setTrainingDayId,
  setTrainingTitle,
} from "@/store/progressSlice";
import { ErrorScreen } from "@/components/ErrorScreen";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { index, id, title, exercises } = useSelector(
    (state: RootState) => state.progress
  );
  const trainingDays = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  const { isLoading } = useTrainingData({ initialLoad: true });

  useEffect(() => {
    if (trainingDays.length > 0) {
      const safeIndex = Math.min(index, trainingDays.length - 1);
      const currentDay = trainingDays[safeIndex];

      dispatch(setTrainingDayId(currentDay.id));
      dispatch(setTrainingTitle(currentDay.title));
      dispatch(setExercises(currentDay.content));
    } else {
      dispatch(setTrainingDayId(""));
      dispatch(setTrainingTitle(""));
      dispatch(setExercises([]));
    }
  }, [trainingDays, index]);

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
            <ErrorScreen />
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

        <TouchableOpacity
          className="flex-[1] justify-center bg-slate-600 rounded-t-2xl"
          onPress={() => {
            if (!exercises?.length || !title?.trim()) {
              alert("Cannot start a not defined workout");
              return;
            }
            navigation.navigate("Workout", {
              id,
              title,
              exercises,
            });
          }}
        >
          <Text className="text-center text-2xl color-white">start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-[1] justify-center bg-slate-600 rounded-t-2xl border-l-2"
          onPress={() => navigation.navigate("History")}
        >
          <Text className="text-center text-2xl color-white">history</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
