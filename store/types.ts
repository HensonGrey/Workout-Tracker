import { ImageSourcePropType } from "react-native";

// ************** for redux elements
export interface TrainingDay {
  id: string;
  title: string;
  content: ExerciseDetails[];
  history?: TrainingDayHistoryObject[]; //save a copy of exercises and a date.now then push it to this array
}

export interface TrainingDayHistoryObject {
  id: string; //to know to which day's history array to push it
  date: Date; //date will be displayed as date.toLocaleString()
  training_day_title: string;
  exercises_performed: ExerciseDetailsHistory[];
}

export interface ExerciseDetailsHistory {
  exercise_title: string;
  sets_performed_titles: string[];
}

export interface TrainingState {
  trainingDays: TrainingDay[];
}

export interface ExerciseDetails {
  id: string;
  title: string;
  setNum: number;
  sets?: ExerciseDetails[]; //Upper A -> Bench 3x10 -> history -> {history: [80x5, 70x7], date: 17.07.2018}, current workout only
  lastWorkoutData?: string[]; //last weeks sets copied
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
  setId?: string; //this is getting ridiculous
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
