import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";

export default function App() {
  return (
    <SafeAreaView className="flex flex-1 flex-col bg-slate-500 h-full">
      <View className="flex-[6]"></View>

      <View className="flex-[1] flex flex-row">
        <TouchableOpacity className="flex-[1] justify-center bg-slate-600 rounded-t-2xl border-r-2">
          <Text className="text-center text-2xl color-white">program</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-[1] justify-center bg-slate-600 rounded-t-2xl">
          <Text className="text-center text-2xl color-white">start</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-[1] justify-center bg-slate-600 rounded-t-2xl border-l-2">
          <Text className="text-center text-2xl color-white">history</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
