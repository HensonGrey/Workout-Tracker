import { ActivityIndicator, ImageSourcePropType } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import SettingsIcon from "@/assets/images/settings.png";
import uuid from "react-native-uuid";
import {
  FileExists,
  InitEmptyFile,
  ReadFile,
} from "@/utils/FileSystemHelperFunctions";

interface TrainingDay {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  content: string[];
  onPress(): void;
}

const ProgramScreen = ({ navigation }: any) => {
  const [trainingDaysArray, setTrainingDaysArray] = useState<TrainingDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //checking if file exists
        const fileExists = await FileExists();

        //if it doesnt -> create one
        if (!fileExists) InitEmptyFile();

        //Read file content
        const fileContent = await ReadFile();
        setTrainingDaysArray(fileContent.program.training_days);
      } catch (error) {
        console.error(`Error reading user data file: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <SafeAreaView className="h-full bg-zinc-300">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );

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
      />
    </SafeAreaView>
  );
};

export default ProgramScreen;
