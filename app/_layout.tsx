import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import React from "react";
import HomeScreen from "./index";
import ProgramScreen from "./screens/ProgramScreen";
import { StatusBar } from "expo-status-bar";
import ProgramDetailsScreen from "./screens/ProgramDetailsScreen";
import { Provider } from "react-redux";
import { store } from "@/store/store";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "grey" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Program" component={ProgramScreen} />
        <Stack.Screen name="Details" component={ProgramDetailsScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </Provider>
  );
}
