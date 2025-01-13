import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

interface TrainingDayProps {
  title: any;
  setNum?: number;
  icon: ImageSourcePropType;
  isBlank?: boolean;
  onPress(): void;
}

const TrainingDayComponent: React.FC<TrainingDayProps> = ({
  title,
  setNum,
  icon,
  isBlank,
  onPress,
}) => {
  const [text, setText] = useState<any>(title);

  return (
    <TouchableOpacity
      className={`p-3 flex flex-row justify-between border-2 border-gray-500 rounded-lg w-full ${
        isBlank ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      <View className="flex flex-row">
        {!isBlank ? (
          <Text className="text-center align-middle text-2xl">
            {setNum !== undefined ? setNum + "." : ""}
          </Text>
        ) : (
          ""
        )}
        <TextInput
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder={`${isBlank ? "Blank" : "Click to edit"}`}
          editable={!isBlank}
          className={`text-2xl pl-4 align-middle w-[82%] ${
            isBlank ? "text-white" : ""
          }`}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={onPress}>
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
