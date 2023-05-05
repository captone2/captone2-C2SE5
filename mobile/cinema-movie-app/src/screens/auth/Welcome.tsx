import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { Logo, Button } from "../../components";
import { COLORS } from "../../utils/theme";

type Props = {
  navigation: any;
};
const Welcome: FC<Props> = ({ navigation }) => {
  const { container, logoContainer, actionsContainer, welcomeContainer } =
    styles;
  const { navigate } = navigation;
  console.log(1);

  return (
    <React.Fragment>
      <StatusBar />
      <SafeAreaView style={container}>
        <View style={{ flex: 1 }}>
          <View style={logoContainer}>
            <Logo />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={welcomeContainer}>
            <View style={{ alignItems: "center" }}>
              <Text>Welcome to rnmovies</Text>
              <Text
                style={{ marginTop: 20, color: COLORS.white, fontSize: 30 }}
              >
                Get Started.
              </Text>
            </View>
          </View>
          <View style={actionsContainer}>
            <View>
              {/* <Button mode="outlined" onPress={() => navigate("auth")}>
                Sign In
              </Button> */}
            </View>
            <View style={{ alignSelf: "center" }}>
              {/* <Button
                mode="outlined"
                style={COLORS.white}
                onPress={() => navigate("register")}
              >
                Sign Up
              </Button> */}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
});

export default Welcome;
