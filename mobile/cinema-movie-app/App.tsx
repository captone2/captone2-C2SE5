import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import store from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        {/* <Navigation /> */}
        <StatusBar />
      </SafeAreaView>
    </Provider>
  );
}
