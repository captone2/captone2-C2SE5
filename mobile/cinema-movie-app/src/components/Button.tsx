import React, { FC } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "../utils/theme";

interface defaultProps {
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  transparent?: boolean;
  color?: string;
  tintColor?: string;
  onPress?: () => any;
}

const Button: FC<defaultProps> = ({
  text,
  color = COLORS.green,
  loading = false,
  onPress,
  disabled = false,
  tintColor = COLORS.black,
  transparent = false,
}) => {
  const { container } = styles;
  const buttonContainerStyle = [container];

  if (disabled || loading) {
    buttonContainerStyle.push({ backgroundColor: COLORS.lightGrey } as any);
  } else if (!transparent) {
    buttonContainerStyle.push({ backgroundColor: color } as any);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonContainerStyle}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={COLORS.white}
          size={Platform.OS === "ios" ? "large" : 24}
          style={{ marginVertical: Platform.OS === "ios" ? 10 : 0 }}
        />
      ) : (
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: tintColor }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 6,
  },
});

export default Button;
