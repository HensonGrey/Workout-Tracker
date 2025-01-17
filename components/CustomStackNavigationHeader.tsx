import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { decrementCounter } from "@/store/counterSlice";

const CustomStackNavigationHeader = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { title, exercises, exercise_index } = route.params;

  // console.log(exercises);
  return (
    <SafeAreaView className="flex flex-row justify-between p-4 bg-slate-500">
      {exercise_index >= 0 ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(decrementCounter());
            navigation.goBack();
          }}
        >
          <ArrowLeft size={36} color={"white"} />
        </TouchableOpacity>
      ) : (
        ""
      )}
      <Text className="text-center align-middle text-2xl">{title}</Text>
      <TouchableOpacity>
        <ArrowRight size={36} color={"white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomStackNavigationHeader;
