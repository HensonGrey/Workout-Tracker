import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  FileExists,
  InitEmptyFile,
  ReadFile,
} from "@/utils/FileSystemHelperFunctions";
import { setTrainingDays } from "@/store/trainingSlice";
import { TrainingDay } from "@/store/types";
import { setIndex } from "@/store/progressSlice";

interface UseTrainingDataProps {
  onNavigateAway?: (trainingDays: TrainingDay[]) => Promise<void>;
  navigation?: any;
  initialLoad?: boolean;
}

export const useTrainingData = ({
  onNavigateAway,
  navigation,
  initialLoad = false,
}: UseTrainingDataProps = {}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const fileExists = await FileExists();
        if (!fileExists) {
          await InitEmptyFile();
        }

        const fileContent = await ReadFile();

        if (isMounted) {
          const validIndex = fileContent.program.current_day_index;
          fileContent.program.training_days.length
            ? fileContent.program.current_day_index
            : 0;

          if (initialLoad) {
            dispatch(setTrainingDays(fileContent.program.training_days));
            dispatch(setIndex(validIndex));
          }

          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Error reading user data file: ${error}`);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, initialLoad]);

  useEffect(() => {
    if (navigation && onNavigateAway) {
      const unsubscribe = navigation.addListener(
        "beforeRemove",
        onNavigateAway
      );
      return unsubscribe;
    }
  }, [navigation, onNavigateAway]);

  return {
    isLoading,
  };
};
