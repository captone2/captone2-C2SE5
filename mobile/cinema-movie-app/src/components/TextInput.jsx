import React from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../../constants";
import Text from "./Text";

const propTypes = {
  label: PropTypes.string.isRequired,
};

const TextInput = ({ label, ...props }) => {
  const { container, textInputStyle } = styles;

  return (
    <View style={container}>
      <Text small style={{ paddingHorizontal: 4 }}>
        {label}
      </Text>
      <RNTextInput
        style={textInputStyle}
        selectionColor={COLORS.white}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  textInputStyle: {
    color: COLORS.lightGrey,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    paddingVertical: 4,
  },
});

TextInput.propTypes = propTypes;

export default TextInput;
