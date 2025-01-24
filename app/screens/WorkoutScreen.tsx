import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import { ExerciseDetails } from "@/store/types";
import WorkoutActionButton from "@/components/WorkoutActionButton";
import { useWorkout } from "@/hooks/useWorkoutScreen";

const WorkoutScreen = ({ navigation, route }: any) => {
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
          <Text className="text-lg font-semibold">
            Previous Workout - {currentExercise.title}
          </Text>
          <ScrollView className="flex-1 bg-zinc-200 rounded-lg p-2 mb-4">
            {currentExercise.lastWorkoutData
              ? currentExercise.lastWorkoutData.map((prevWorkoutSet, index) => (
                  <TrainingDayComponent
                    key={index}
                    id={""} //element is readonly, doesnt need an id
                    title={prevWorkoutSet}
                    onPress={() => {}}
                  />
                ))
              : ""}
          </ScrollView>
        </View>
      </View>

      {/* Complete or Skip the workout*/}
      <WorkoutActionButton
        exerciseIndex={exercise_index}
        exercisesLength={exercises.length}
        onSkip={async () => {
          await skipWorkout();
          navigation.goBack();
        }}
        onComplete={async () => {
          await completeWorkout();
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
