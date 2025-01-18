import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";
import { ExerciseDetails } from "@/store/types";
import { addExerciseSet, deleteExerciseSet } from "@/store/trainingSlice";

const WorkoutScreen = ({ route }: any) => {
  const { id, exercise_index } = route.params;
  const dispatch = useDispatch();

  // Get current exercise from Redux store instead of route params
  const currentExercise = useSelector((state: any) => {
    const day = state.training.trainingDays.find((day: any) => day.id === id);
    return day ? day.content[exercise_index] : null;
  });

  if (!currentExercise) {
    return (
      <SafeAreaView className="h-full bg-zinc-300 p-2">
        <Text>Exercise not found</Text>
      </SafeAreaView>
    );
  }

  const addSet = () => {
    const newSet: ExerciseDetails = {
      id: uuid.v4().toString(),
      title: ``,
      setNum: (currentExercise.sets?.length || 0) + 1,
    };

    dispatch(
      addExerciseSet({
        training_day_id: id,
        exercise_index,
        newSet,
      })
    );
  };

  const removeSet = (set_id: string) => {
    dispatch(
      deleteExerciseSet({
        currrent_day_id: id,
        exercise_to_delete_id: currentExercise.id,
        set_to_delete_id: set_id,
      })
    );
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300 p-2">
      <Text className="text-xl font-bold mb-4">{currentExercise.title}</Text>

      <ScrollView className="flex-1">
        {(currentExercise.sets || []).map((set: ExerciseDetails) => (
          <TrainingDayComponent
            key={set.id}
            id={set.id}
            title={``}
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
        <ScrollView className="bg-zinc-200 rounded-lg p-2" />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
