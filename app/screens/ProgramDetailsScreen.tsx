import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useProgramDetails from "@/hooks/useProgramDetails";
import { ErrorScreen } from "@/components/ErrorScreen";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";

export default function ProgramDetailsScreen({ route, navigation }: any) {
  const { parent_id } = route.params;
  const {
    programDetailsArray,
    handleAddExercise,
    handleDeleteExercise,
    handleDeleteTrainingDay,
  } = useProgramDetails(parent_id, navigation);

  if (!programDetailsArray) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaView className="h-full bg-zinc-300 flex flex-col justify-between p-2">
      <View className="h-[80%] border-2 rounded-2xl p-2">
        <ScrollView>
          {programDetailsArray.map((exercise, index) => (
            <TrainingDayComponent
              key={index}
              id={exercise.id}
              parentId={parent_id}
              title={exercise.title}
              setNum={exercise.setNum}
              icon={MinusIcon}
              onPress={() => handleDeleteExercise(exercise.id)}
            />
          ))}
          <TrainingDayComponent
            id=""
            title=""
            icon={PlusIcon}
            isBlank
            onPress={() => handleAddExercise()}
          />
        </ScrollView>
      </View>

      <View className="flex flex-row">
        <TouchableOpacity
          className="flex-1 h-24 bg-red-500 justify-center rounded-3xl border-2 border-gray-500"
          onPress={handleDeleteTrainingDay}
        >
          <Text className="text-2xl text-center">Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
