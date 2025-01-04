import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

interface TrainingDayProps {
  title: string;
  icon: ImageSourcePropType;
  isBlank?: boolean;
  onPress?(): void;
  onIconPress(): void;
}

const TrainingDayComponent: React.FC<TrainingDayProps> = ({
  title,
  icon,
  isBlank,
  onPress,
  onIconPress,
}) => {
  const [text, setText] = useState<any>("");

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-3 flex flex-row justify-between border-2 border-gray-500 rounded-lg ${
        isBlank ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      <TextInput
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder={`${isBlank ? "Blank" : "Click to edit"}`}
        editable={false}
        className={`text-2xl pl-4 align-middle ${isBlank ? "text-white" : ""}`}
      ></TextInput>
      <TouchableOpacity onPress={onIconPress}>
        <View
          className={`border-2 rounded-full p-2 ${
            isBlank ? "bg-gray-200" : ""
          }`}
        >
          <Image source={icon} className="h-8 w-8"></Image>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrainingDayComponent;
