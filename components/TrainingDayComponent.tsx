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
  setId,
  onPress,
}) => {
  const dispatch = useDispatch();
  const trainingDaysArray = useSelector(
    (state: RootState) => state.training.trainingDays
  );
  const [localTitle, setLocalTitle] = useState(initialTitle);

  const handleTextChange = (text: string) => {
    setLocalTitle(text);
    if (isBlank) return;

    // Case 1: Updating a set (requires both parentId and setId)
    if (parentId && setId) {
      dispatch(
        updateTrainingDayTextInput({
          id: parentId,
          newTitle: text,
          exerciseId: id,
          setId: setId,
        })
      );
    }
    // Case 2: Updating an exercise (requires only parentId)
    else if (parentId) {
      dispatch(
        updateTrainingDayTextInput({
          id: parentId,
          newTitle: text,
          exerciseId: id,
        })
      );
    }
    // Case 3: Updating a training day (requires only id)
    else {
      dispatch(updateTrainingDayTextInput({ id, newTitle: text }));
    }
    // Save changes to persistent storage after the update
    SaveNameChanges(trainingDaysArray);
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
          editable={!isBlank && icon !== undefined}
          className={`text-2xl pl-4 align-middle w-[82%] ${
            isBlank ? "text-white" : ""
          } ${icon ? "" : "text-center ml-10"}`}
        />
      </View>
      <TouchableOpacity onPress={onPress}>
        <View
          className={`${icon ? "border-2 rounded-full p-2" : ""} ${
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
