import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./src/containers/mainLayout/Header";
import MovieContext from "./src/context/Context";

export default function App() {
  return (
    <MovieContext>
      <SafeAreaView>
        <Header />
        <StatusBar style="auto" />
      </SafeAreaView>
    </MovieContext>
  );
}
