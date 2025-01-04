import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

interface TrainingDayProps {
  title: string;
  icon: ImageSourcePropType;
  isBlank?: boolean;
  onPress(): void;
}

const TrainingDayComponent: React.FC<TrainingDayProps> = ({
  title,
  icon,
  isBlank,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`p-3 flex flex-row justify-between border-2 border-gray-500 rounded-lg ${
        isBlank ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-2xl pl-4 align-middle ${isBlank ? "text-white" : ""}`}
      >
        {title}
      </Text>
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
