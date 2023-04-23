import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const Header = () => {
  const screenOptions = {};
  const logo = require("../../../assets/icon.png");
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("press logo")}>
          <Image source={logo} style={{ height: "100%", width: 20 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Header</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
    height: 30,
    display: "flex",
    flexDirection: "row",
    color: COLORS.white,
  },
  title: {
    color: COLORS.white,
  },
});
