/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import TabBottom from "../../components/TabBottom";
import { COLORS } from "../../utils/theme";

const Stack = createNativeStackNavigator();
const MainTab = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="TabBottom" component={TabBottom} />
  </Stack.Navigator>
);

export default MainTab;
