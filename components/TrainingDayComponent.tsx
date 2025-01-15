import { RootState } from "@/store/store";
import { updateTrainingDayTextInput } from "@/store/trainingSlice";
import { TrainingDayUI } from "@/store/types";
import { SaveNameChanges } from "@/utils/FileSystemHelperFunctions";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const TrainingDayComponent: React.FC<TrainingDayUI> = ({
  id,
  title: initialTitle,
  setNum,
  icon,
  isBlank,
  parentId,
  onPress,
}) => {
  const dispatch = useDispatch();
  const trainingDaysArray = useSelector(
    (state: RootState) => state.training.trainingDays
  );
  const [localTitle, setLocalTitle] = useState(initialTitle);

  const handleTextChange = (text: string) => {
    setLocalTitle(text);

    if (!isBlank) {
      if (parentId) {
        // This is an exercise being edited
        dispatch(
          updateTrainingDayTextInput({
            id: parentId,
            newTitle: text,
            exerciseId: id,
          })
        );
      } else {
        // This is a training day being edited
        dispatch(updateTrainingDayTextInput({ id, newTitle: text }));
      }
    }
  };

  useEffect(() => {
    setLocalTitle(initialTitle);
  }, [initialTitle]);

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
        ) : null}
        <TextInput
          value={localTitle}
          onChangeText={handleTextChange}
          onEndEditing={async () => await SaveNameChanges(trainingDaysArray)}
          placeholder={`${isBlank ? "Blank" : "Click to edit"}`}
          editable={!isBlank}
          className={`text-2xl pl-4 align-middle w-[82%] ${
            isBlank ? "text-white" : ""
          }`}
        />
      </View>
      <TouchableOpacity onPress={onPress}>
        <View
          className={`border-2 rounded-full p-2 ${
            isBlank ? "bg-gray-200" : ""
          }`}
        >
          <Image source={icon} className="h-8 w-8" />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrainingDayComponent;
