import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutScreen = ({ navigation, route }: any) => {
  const { id, title, exercises, exercise_index } = route.params;

  return (
    <SafeAreaView className="h-full bg-zinc-300 flex flex-col justify-between p-2"></SafeAreaView>
  );
};

export default WorkoutScreen;
