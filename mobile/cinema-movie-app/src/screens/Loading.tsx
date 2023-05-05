import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";
import { Logo, Loading } from "../components";

const LoadingScreen = () => {
  // useEffect(() => {
  //   dispatch(initFirebase());
  // }, [dispatch]);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default LoadingScreen;
