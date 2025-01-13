import filePath from "@/constants/FilePath";
import * as FileSystem from "expo-file-system";
import { ImageSourcePropType } from "react-native";

interface TrainingDay {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  content: string[];
  onPress(): void;
}

//checking if file exists
export const FileExists = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return fileInfo.exists;
  } catch (err) {
    console.error(`there was a file checking if file exists!\n${err}`);
  }
};

//initializing an empty file
export const InitEmptyFile = async () => {
  try {
    const fileStructure = {
      program: {
        training_days: [],
      },
    };
    await FileSystem.writeAsStringAsync(
      filePath,
      JSON.stringify(fileStructure),
      {
        encoding: FileSystem.EncodingType.UTF8,
      }
    );
  } catch (err) {
    console.error(`There was an error initializing the file!\n${err}`);
  }
};

//reading the user's data file and returning the content i.e the program
export const ReadFile = async () => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    return JSON.parse(fileContent);
  } catch (err) {
    console.error(`There was an error reading the file!\n${err}`);
  }
};

//updating the user's file with a newly created, passed as an argument training day
export const AddTrainingDay = async (training_day: TrainingDay) => {
  try {
    const data = await ReadFile();
    data.program.training_days.push(training_day);

    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    console.error(`There was an error adding the training day!\n${err}`);
  }
};

//TODO -> empties the array? probably an issue with idk identical uuids

//will delete by passed uuid
export const DeleteTrainingDay = async (uuid: string) => {
  try {
    const data = await ReadFile();
    data.program.training_days = data.program.training_days.filter(
      (day: TrainingDay) => day.id !== uuid
    );

    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    console.error(`There was an error deleting a training day!\n${err}`);
  }
};

//saving name changes when user clicks settings in ProgramScreen
export const SaveNameChanges = async (training_days: TrainingDay[]) => {
  try {
    const data = await ReadFile();
    data.training_days = training_days;
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    console.error(`There was an error updating the name changes!\n${err}`);
  }
};
