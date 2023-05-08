/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabBottom from "../../components/TabBottom";
import Welcome from "../auth/Welcome";
import Login from "../auth/Login";
import MovieShowing from "../home/MovieShowing";
import MovieComing from "../home/MovieComing";

const Stack = createNativeStackNavigator();
const MainTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabBottom" component={TabBottom} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="MovieShowing" component={MovieShowing} />
      <Stack.Screen name="MovieComing" component={MovieComing} />
    </Stack.Navigator>
  );
};

export default MainTab;
