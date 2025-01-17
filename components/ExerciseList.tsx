import React from "react";
import { ExerciseDetails } from "@/store/types";
import { ScrollView } from "react-native";
import TrainingDayComponent from "./TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.png";

interface ExerciseListProps {
  exercises: ExerciseDetails[];
  parentId?: string;
  onDeleteExercise: (id: string) => void;
  onAddExercise: () => void;
}

const ExerciseList = ({
  exercises,
  parentId,
  onDeleteExercise,
  onAddExercise,
}: ExerciseListProps) => (
  <ScrollView>
    {exercises.map((exercise, index) => (
      <TrainingDayComponent
        key={index}
        id={exercise.id}
        parentId={parentId}
        title={exercise.title}
        setNum={exercise.setNum}
        icon={MinusIcon}
        onPress={() => onDeleteExercise(exercise.id)}
      />
    ))}
    <TrainingDayComponent
      id=""
      title=""
      icon={PlusIcon}
      isBlank
      onPress={onAddExercise}
    />
  </ScrollView>
);

export default ExerciseList;
