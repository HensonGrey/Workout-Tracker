import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";

import { RootState } from "@/store/store";
import TrainingDayComponent from "@/components/TrainingDayComponent";
import {
  AddTrainingDay,
  SaveNameChanges,
} from "@/utils/FileSystemHelperFunctions";
import { addEmptyTrainingDay, setTrainingDays } from "@/store/trainingSlice";
import { TrainingDay } from "@/store/types";

import PlusIcon from "@/assets/images/plus.png";
import SettingsIcon from "@/assets/images/settings.png";

const ProgramScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const trainingDaysArray = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  useEffect(() => {
    const handleNavigateAway = async () => {
      try {
        dispatch(setTrainingDays([...trainingDaysArray]));
        await SaveNameChanges(trainingDaysArray);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    };

    navigation.addListener("beforeRemove", handleNavigateAway);
    return () => navigation.removeListener("beforeRemove", handleNavigateAway);
  }, [navigation, trainingDaysArray]);

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
      console.error("Error adding training day", err);
    }
  };

  return (
    <SafeAreaView className="h-full bg-zinc-300 p-2">
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
        onPress={addTrainingDay}
      />
    </SafeAreaView>
  );
};

export default ProgramScreen;
