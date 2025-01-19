import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementCounter, incrementCounter } from "@/store/counterSlice";
import { RootState } from "@/store/store";

const CustomStackNavigationHeader = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { id, title, exercises } = route.params;
  const exercise_index = useSelector(
    (state: RootState) => state.counterSlice.exercise_index
  );

  return (
    <SafeAreaView className="bg-slate-500 p-2">
      <View className="flex-row items-center justify-between px-4 h-14 relative">
        {/* Left Arrow */}
        {exercise_index > 0 ? (
          <TouchableOpacity
            className="p-2 z-10"
            onPress={() => {
              dispatch(decrementCounter());
              navigation.navigate("Workout", { id, title, exercises });
            }}
          >
            <ArrowLeft size={36} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="p-2 z-10"></TouchableOpacity>
        )}

        {/* Centered Title */}
        <View className="absolute left-0 right-0 items-center justify-center">
          <Text
            className="text-2xl font-semibold"
            onPress={() => navigation.goBack()} //for testing purposes
          >
            {title}
          </Text>
        </View>

        {/* Right Arrow */}
        {exercise_index < exercises.length - 1 ? (
          <TouchableOpacity
            className="p-2 z-10"
            onPress={() => {
              dispatch(incrementCounter());
              navigation.navigate("Workout", { id, title, exercises });
            }}
          >
            <ArrowRight size={36} color="#000" />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomStackNavigationHeader;
