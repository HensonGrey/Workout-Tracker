import { ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const trainingDays = useSelector(
    (state: RootState) => state.training.trainingDays
  );

  return (
    <SafeAreaView className="h-full">
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
