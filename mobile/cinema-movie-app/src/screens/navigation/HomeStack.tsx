import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../home/Home";
import MovieShowing from "../home/MovieShowing";
import MovieComing from "../home/MovieComing";

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trang chu" component={Home} />
      <Stack.Screen name="Phim sap chieu" component={MovieShowing} />
      <Stack.Screen name="Phim dang chieu" component={MovieComing} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
