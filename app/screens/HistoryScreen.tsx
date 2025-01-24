import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const HistoryScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.goBack()}>HistoryScreen</Text>
    </SafeAreaView>
  );
};

export default HistoryScreen;
