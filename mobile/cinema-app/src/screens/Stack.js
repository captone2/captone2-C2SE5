import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import index from "./index";

const Stack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="" component={index} />
    </Stack.Navigator>
  );
};

export default Stack;
