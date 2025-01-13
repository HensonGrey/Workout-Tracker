import { ActivityIndicator, ImageSourcePropType } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import SettingsIcon from "@/assets/images/settings.png";
import uuid from "react-native-uuid";
import {
  AddTrainingDay,
  FileExists,
  InitEmptyFile,
  ReadFile,
  SaveNameChanges,
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
        if (!fileExists) await InitEmptyFile();

        //Read file content
        const fileContent = await ReadFile();
        setTrainingDaysArray(fileContent.program.training_days);

        console.log(fileContent);
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

  const addTrainingDay = async () => {
    const initNewEmptyDay: TrainingDay = {
      id: uuid.v4(),
      title: "",
      icon: SettingsIcon,
      content: [],
      onPress: () => console.log("Test - New Training Day Added!"),
    };

    setTrainingDaysArray((prevDays) => [...prevDays, initNewEmptyDay]);
    await AddTrainingDay(initNewEmptyDay); //saving the added program day to the file
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300">
      {trainingDaysArray.map((trainingDay, index) => (
        <TrainingDayComponent
          key={index}
          title={trainingDay.title}
          icon={trainingDay.icon}
          onPress={async () => {
            // for (let i = 0; i < trainingDaysArray.length; i++) {
            //   console.log(trainingDaysArray[i]);
            // }
            // await SaveNameChanges(trainingDaysArray);
            navigation.navigate("Details", { id: trainingDay.id });
          }}
        />
      ))}

      <TrainingDayComponent
        title=""
        icon={PlusIcon}
        isBlank
        onPress={() => addTrainingDay()}
      />
    </SafeAreaView>
  );
};

export default ProgramScreen;
