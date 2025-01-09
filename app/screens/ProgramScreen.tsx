import { ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import SettingsIcon from "@/assets/images/settings.png";
import uuid from "react-native-uuid";

interface TrainingDay {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  content: string[];
  onPress(): void;
}

const ProgramScreen = ({ navigation }: any) => {
  const [trainingDaysArray, setTrainingDaysArray] = useState<TrainingDay[]>([]);
  const addTrainingDay = () => {
    const initNewEmptyDay: TrainingDay = {
      id: uuid.v4(),
      title: "",
      icon: SettingsIcon,
      content: [],
      onPress: () => console.log("Test - New Training Day Added!"),
    };
    setTrainingDaysArray((prevDays) => [...prevDays, initNewEmptyDay]);
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300">
      {trainingDaysArray.map((trainingDay, index) => (
        <TrainingDayComponent
          key={index}
          icon={trainingDay.icon}
          onPress={() => console.log("editing ...")}
          onIconPress={() =>
            navigation.navigate("Details", { id: trainingDay.id })
          }
        />
      ))}

      <TrainingDayComponent
        icon={PlusIcon}
        isBlank
        onIconPress={() => addTrainingDay()}
      ></TrainingDayComponent>
    </SafeAreaView>
  );
};

export default ProgramScreen;
