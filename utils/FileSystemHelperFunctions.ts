import filePath from "@/constants/FilePath";
import * as FileSystem from "expo-file-system";

//These helper function will already have a try catch statement where there are called
// so i dont really see a reason to add them here as well

//checking if file exists, if it doesnt, create one
export const FileExists = async () => {
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  return fileInfo.exists;
};

export const InitEmptyFile = async () => {
  const fileStructure = {
    program: {
      training_days: [],
    },
  };
  await FileSystem.writeAsStringAsync(filePath, JSON.stringify(fileStructure), {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const ReadFile = async () => {
  const fileContent = await FileSystem.readAsStringAsync(filePath);
  return JSON.parse(fileContent);
};
