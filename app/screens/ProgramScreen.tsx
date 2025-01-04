import { Text, View, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import MinusIcon from "@/assets/images/minus.jpg";
import uuid from "react-native-uuid";

interface TrainingDay {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  content: string[];
  onPress(): void;
}

const ProgramScreen = () => {
  const [trainingDaysArray, setTrainingDaysArray] = useState<TrainingDay[]>([]);
  const addTrainingDay = () => {
    const initNewEmptyDay: TrainingDay = {
      id: uuid.v4(),
      title: "",
      icon: MinusIcon,
      content: [],
      onPress: () => console.log("Test - New Training Day Added!"),
    };
    setTrainingDaysArray((prevDays) => [...prevDays, initNewEmptyDay]);
  };

  const deleteTrainingDay = (index: string) => {
    setTrainingDaysArray((prevArray) =>
      prevArray.filter((day) => day.id !== index)
    );
  };
  return (
    <SafeAreaView className="h-full bg-zinc-300">
      {trainingDaysArray.map((trainingDay, index) => (
        <TrainingDayComponent
          key={index}
          title={trainingDay.title}
          icon={trainingDay.icon}
          onPress={() => deleteTrainingDay(trainingDay.id)}
        />
      ))}

      <TrainingDayComponent
        title="blank"
        icon={PlusIcon}
        isBlank
        onPress={() => addTrainingDay()}
      ></TrainingDayComponent>
    </SafeAreaView>
  );
};

export default ProgramScreen;
