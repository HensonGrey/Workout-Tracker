import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import { ExerciseDetails } from "@/store/types";
import WorkoutActionButton from "@/components/WorkoutActionButton";
import { useWorkout } from "@/hooks/useWorkoutScreen";

const WorkoutScreen = ({ route }: any) => {
  const {
    id,
    currentExercise,
    exercises,
    exercise_index,
    addSet,
    removeSet,
    completeWorkout,
    skipWorkout,
  } = useWorkout(route);

  return (
    <SafeAreaView className="flex-1 bg-zinc-300">
      <View className="flex-1 p-2">
        <Text className="text-xl font-bold mb-4">{currentExercise.title}</Text>
        <ScrollView className="flex-1">
          {(currentExercise.sets || []).map((set: ExerciseDetails) => (
            <TrainingDayComponent
              key={set.id}
              id={currentExercise.id}
              setId={set.id}
              title={set.title || ""}
              parentId={id}
              setNum={set.setNum}
              icon={MinusIcon}
              onPress={() => removeSet(set.id)}
            />
          ))}

          <TrainingDayComponent
            id=""
            title="Add new set"
            icon={PlusIcon}
            isBlank
            onPress={addSet}
          />
        </ScrollView>

        <View className="h-2/5 mt-2">
          <Text className="text-lg font-semibold">Previous Workout</Text>
          <ScrollView className="flex-1 bg-zinc-200 rounded-lg p-2 mb-4" />
        </View>
      </View>

      {/* Delete button*/}
      <WorkoutActionButton
        exerciseIndex={exercise_index}
        exercisesLength={exercises.length}
        onSkip={skipWorkout}
        onComplete={completeWorkout}
      />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
