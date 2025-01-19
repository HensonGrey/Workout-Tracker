import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface WorkoutActionButtonProps {
  exerciseIndex: number;
  exercisesLength: number;
  onSkip: () => void;
  onComplete: () => void;
}

const WorkoutActionButton = ({
  exerciseIndex,
  exercisesLength,
  onSkip,
  onComplete,
}: WorkoutActionButtonProps) => {
  const isLastExercise = exerciseIndex >= exercisesLength - 1;

  const handlePress = () => {
    if (isLastExercise) {
      onComplete();
    } else {
      onSkip();
    }
  };

  return (
    <View className="px-4 pb-4">
      <TouchableOpacity
        className={`h-16 justify-center items-center rounded-2xl border-2 border-gray-500 ${
          isLastExercise ? "bg-green-500" : "bg-orange-500"
        }`}
        onPress={handlePress}
      >
        <Text className="text-2xl text-white font-semibold">
          {isLastExercise ? "Complete" : "Skip Workout"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutActionButton;
