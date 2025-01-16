import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React from "react";

export const ErrorScreen: React.FC = () => (
  <SafeAreaView className="h-full bg-black">
    <Text className="text-center text-3xl text-red-800">404</Text>
  </SafeAreaView>
);
