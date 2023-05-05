import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input, TextInputProps } from "react-native-paper";
import { COLORS } from "../utils/theme";

interface TextInputProps1 extends TextInputProps {
  errorText?: any;
  description?: string;
}
const TextInput: FC<TextInputProps1> = ({
  errorText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={COLORS.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};
export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 1,
  },
  input: {
    minWidth: "100%",
    backgroundColor: COLORS.colors.surface,
    borderRadius: 40,
  },
  description: {
    fontSize: 13,
    color: COLORS.colors.surface,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: COLORS.colors.error,
    paddingTop: 2,
  },
});
