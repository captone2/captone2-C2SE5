import { DefaultTheme } from "react-native-paper";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    label: "#3C3C43",
    secondary: "#414757",
    error: "#f13a59",
    warning: "#FB6340",
    yelow: "#F1DB1A",
    white: "#FFFFFF",
    primary: "#FF002E", // Red
    black: "#000000",
    blue: "#4096FE",
    gray: "#464646",
    gray1: "#363636",
    lightGray: "#dedede",
    transparentWhite: "rgba(255, 255, 255, 0.2)",
    transparentBlack: "rgba(0, 0, 0, 0.4)",
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
