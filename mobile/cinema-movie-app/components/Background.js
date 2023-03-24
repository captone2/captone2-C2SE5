import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React from "react";
import { theme } from "../constants/theme";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/images/series/prison_break/prison_break_cover.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    zIndex: 1000,
    background: "transparent",
  },
  container: {
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
