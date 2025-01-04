import { View, Text, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.jpg";
import uuid from "react-native-uuid";

interface ExerciseDetailsProp {
  id: string;
  title: string;
  icon: ImageSourcePropType;
}

export default function ProgramDetailsScreen({ route }: any) {
  const [programDetailsArray, setProgramDetailsArray] = useState<
    //what will be passed as content to the training day
    ExerciseDetailsProp[]
  >([]);
  //   const { id } = route.params;

  function addExercise(): void {
    const newExercise: ExerciseDetailsProp = {
      id: uuid.v4(),
      title: "",
      icon: MinusIcon,
    };

    setProgramDetailsArray((prev) => [...prev, newExercise]);
  }

  function deleteExercise(id: any): void {
    setProgramDetailsArray((prev) => prev.filter((day) => day.id !== id));
  }

  return (
    <SafeAreaView className="h-full bg-zinc-300">
      {programDetailsArray.map((exercise, index) => (
        <TrainingDayComponent
          key={index}
          title={exercise.title}
          icon={MinusIcon}
          onIconPress={() => deleteExercise(exercise.id)}
        />
      ))}

      <TrainingDayComponent
        title="blank"
        icon={PlusIcon}
        isBlank
        onIconPress={() => addExercise()}
      ></TrainingDayComponent>
    </SafeAreaView>
  );
}
