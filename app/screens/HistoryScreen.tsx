import { ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ErrorScreen } from "@/components/ErrorScreen";

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const trainingDays = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  return <ErrorScreen />;
};

export default HistoryScreen;
