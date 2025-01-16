import { ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import PlusIcon from "@/assets/images/plus.png";
import SettingsIcon from "@/assets/images/settings.png";
import uuid from "react-native-uuid";
import {
  AddTrainingDay,
  SaveNameChanges,
} from "@/utils/FileSystemHelperFunctions";
import { TrainingDay } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addEmptyTrainingDay, setTrainingDays } from "@/store/trainingSlice";
import { useTrainingData } from "@/hooks/useTrainingData";

const ProgramScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const trainingDaysArray = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  const { isLoading } = useTrainingData({
    navigation,
    onNavigateAway: async () => {
      try {
        dispatch(setTrainingDays([...trainingDaysArray]));
        await SaveNameChanges(trainingDaysArray);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    },
  });

  const addTrainingDay = async () => {
    try {
      const initNewEmptyDay: TrainingDay = {
        id: uuid.v4(),
        title: "",
        content: [],
      };
      dispatch(addEmptyTrainingDay(initNewEmptyDay));
      await AddTrainingDay(initNewEmptyDay);
    } catch (err) {
      console.error(
        `There was an error in addTrainingDay function in ProgramScreen.tsx\n${err}`
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-zinc-300">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

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
