import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import { theme } from "./constants/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigations/index";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
