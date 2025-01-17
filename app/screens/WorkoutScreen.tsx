import TrainingDayComponent from "@/components/TrainingDayComponent";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";

const WorkoutScreen = ({ route }: any) => {
  const { exercises, exercise_index } = route.params;
  const currentExercise = exercises[exercise_index];
  const [setCount, setSetCount] = useState(0);

  const addSet = () => {
    setSetCount((prev) => prev + 1);
  };

  const removeSet = () => {
    setSetCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300 p-2">
      <Text className="text-xl font-bold mb-4">{currentExercise.title}</Text>

      <ScrollView className="flex-1">
        {/* Display Sets */}
        {[...Array(setCount)].map((_, index) => (
          <TrainingDayComponent
            key={index}
            id={``}
            title={``}
            icon={MinusIcon}
            onPress={removeSet}
          />
        ))}

        {/* Add Set Button */}
        <TrainingDayComponent
          id="add-set"
          title="Add new set"
          icon={PlusIcon}
          isBlank
          onPress={addSet}
        />
      </ScrollView>

      <View className="h-2/5 mt-2">
        <Text className="text-lg font-semibold">Previous Workout</Text>
        <ScrollView className="bg-zinc-200 rounded-lg p-2">
          {/* Previous workout history will go here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
