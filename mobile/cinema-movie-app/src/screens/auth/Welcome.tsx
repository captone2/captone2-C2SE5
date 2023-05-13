import { StatusBar } from "expo-status-bar";
import React, { FC, useCallback } from "react";
import { View, StyleSheet, SafeAreaView, Text, Linking, Alert } from "react-native";
import { Logo, Button } from "../../components";
import { COLORS } from "../../utils/theme";

type Props = {
  navigation?: any;
};
const Welcome: FC<Props> = ({ navigation }) => {
  const { container, logoContainer, actionsContainer, welcomeContainer } = styles;

  const redirectHomeWebURL = "http://localhost:4200/register";

  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button transparent text="Đăng ký" tintColor={COLORS.white} onPress={handlePress} />;
  };

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
              <Text>Chào mừng bạn</Text>
              <Text style={{ marginTop: 20, color: COLORS.white, fontSize: 30 }}>Get Started.</Text>
            </View>
          </View>
          <View style={actionsContainer}>
            <View>
              <Button
                transparent
                text="Đăng nhập"
                tintColor={COLORS.white}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
            <View style={{ alignSelf: "center" }}>
              {/* <Button
                transparent
                text="Sign Up"
                tintColor={COLORS.white}
                onPress={() => navigation.navigate("HomeStack")}
              /> */}
              <OpenURLButton url={redirectHomeWebURL} />
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
    // backgroundColor: COLORS.red,
  },
});

export default Welcome;
