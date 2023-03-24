import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import Header from "../components/Header";
import Background from "../components/Background";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Background>
        <Header />
      </Background>
      <MainTabs />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
