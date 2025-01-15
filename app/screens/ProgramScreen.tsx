import { ActivityIndicator } from "react-native";
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
import { TrainingDay } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addEmptyTrainingDay, setTrainingDays } from "@/store/trainingSlice";

const ProgramScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const trainingDaysArray = useSelector(
    (state: RootState) => state.training.trainingDays
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const fileExists = await FileExists();
        if (!fileExists) {
          await InitEmptyFile();
        }

        const fileContent = await ReadFile();

        // Only update state if component is still mounted
        if (isMounted) {
          dispatch(setTrainingDays(fileContent.program.training_days));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Error reading user data file: ${error}`);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Save data when navigating away
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      try {
        await SaveNameChanges(trainingDaysArray);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    });

    return unsubscribe;
  }, [navigation, trainingDaysArray]);

  if (isLoading)
    return (
      <SafeAreaView className="h-full bg-zinc-300">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );

  const addTrainingDay = async () => {
    try {
      const initNewEmptyDay: TrainingDay = {
        id: uuid.v4(),
        title: "",
        content: [],
      };
      dispatch(addEmptyTrainingDay(initNewEmptyDay));
      await AddTrainingDay(initNewEmptyDay); //saving the added program day to the file
    } catch (err) {
      console.error(
        `There was an error in addTrainingDay function in ProgramScreen.tsx\n${err}`
      );
    }
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300">
      {trainingDaysArray.map((trainingDay, index) => (
        <TrainingDayComponent
          key={index}
          id={trainingDay.id}
          title={trainingDay.title}
          icon={SettingsIcon}
          onPress={() => {
            navigation.navigate("Details", { parent_id: trainingDay.id });
          }}
        />
      ))}

      <TrainingDayComponent
        id=""
        title=""
        icon={PlusIcon}
        isBlank
        onPress={() => addTrainingDay()}
      />
    </SafeAreaView>
  );
};

export default ProgramScreen;
