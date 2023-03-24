import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
