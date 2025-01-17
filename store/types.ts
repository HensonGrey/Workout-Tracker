import { ImageSourcePropType } from "react-native";

// ************** for redux elements
export interface TrainingDay {
  id: string;
  title: string;
  content: ExerciseDetails[];
}

export interface TrainingState {
  trainingDays: TrainingDay[];
}

export interface ExerciseDetails {
  id: string;
  title: string;
  setNum: number;
}

export interface NextTrainingDay {
  index: number; //index of training day inside the trainingDaysArray
  id: string;
  title: string;
  exercises: ExerciseDetails[];
}

// **********  for the UI, mapping the redux object and adding some extra redux-unserializable types
export interface TrainingDayUI {
  id: string;
  title: string;
  content?: ExerciseDetailsUI[];
  setNum?: number; //to ennumerate them in the UI
  icon?: ImageSourcePropType; //dont need icons in HomeScreen
  isBlank?: boolean;
  parentId?: string;
  onPress(): void;
}

export interface ExerciseDetailsUI {
  id: string;
  title: string;
  setNum: number;
  icon: ImageSourcePropType;
  isBlank?: boolean;
  onPress(): void;
}
