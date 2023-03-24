import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SIZES, theme } from "../constants/theme";

const Header = () => {
  const pressedMenu = () => {
    console.log("Button pressed");
  };

  const pressedInfor = () => {
    console.log("Button pressed");
  };

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View style={styles.backgroundColor}>
        <View style={styles.header}>
          <Animated.View>
            <TouchableOpacity>
              <FontAwesome
                name="user-circle"
                onPress={pressedInfor}
                style={styles.iconInfor}
              ></FontAwesome>
            </TouchableOpacity>
          </Animated.View>
          <View>
            <Text style={styles.title}>CGV</Text>
          </View>
          <Animated.View>
            <TouchableOpacity>
              <FontAwesome
                name="bars"
                onPress={pressedMenu}
                style={styles.iconMenu}
              ></FontAwesome>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  backgroundColor: {
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    textAlign: "center",
  },
  iconInfor: {
    color: theme.colors.white,
    fontSize: SIZES.h2,
    paddingVertical: 5,
  },
  title: {
    color: theme.colors.white,
    fontSize: SIZES.h2,
  },
  iconMenu: {
    color: theme.colors.white,
    fontSize: SIZES.h2,
    paddingVertical: 5,
  },
});
