import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsTop from "../components/TabsTop";

const Stack = createStackNavigator();
const MainTabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabsTop" component={TabsTop} />
    </Stack.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
