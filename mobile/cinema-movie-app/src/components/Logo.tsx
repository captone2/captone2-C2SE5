import React, { FC } from "react";
import { Image, View } from "react-native";
import { COLORS } from "../utils/theme";
// import star from "./../../assets/icons/star.png";

const Logo: FC = () => (
  <View style={{ position: "absolute", top: "10%" }}>
    <Image
      source={require("./../../assets/icons/logo.png")}
      resizeMode="stretch"
      style={{
        tintColor: COLORS.colors.surface,
        width: 340,
      }}
    />
  </View>
);

export default Logo;
