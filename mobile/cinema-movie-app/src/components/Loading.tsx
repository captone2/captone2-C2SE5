import React, { FC } from "react";
import { Platform, View, ActivityIndicator } from "react-native";
import { COLORS } from "../utils/theme";

const Loading: FC = () => (
  <View style={{ marginVertical: Platform.OS === "ios" ? 10 : 5 }}>
    <ActivityIndicator
      color={COLORS.green}
      style={{ paddingVertical: Platform.OS === "ios" ? 5 : 0 }}
      size={Platform.OS === "ios" ? "large" : 30}
    />
  </View>
);

export default Loading;
