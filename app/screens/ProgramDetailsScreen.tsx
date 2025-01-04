import { View, Text } from "react-native";
import React from "react";

export default function ProgramDetailsScreen({ route }: any) {
  const { id } = route.params;
  return (
    <View>
      <Text>UUID : {id}</Text>
    </View>
  );
}
