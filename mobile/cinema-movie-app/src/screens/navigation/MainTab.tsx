/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabBottom from "../../components/TabBottom";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Welcome from "../auth/Welcome";
import Login from "../auth/Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MainTab = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="TabBottom" component={TabBottom} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Welcome" component={Welcome} />
  </Stack.Navigator>
);

export default MainTab;
