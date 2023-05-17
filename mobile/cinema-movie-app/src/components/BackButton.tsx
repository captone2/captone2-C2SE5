import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import { COLORS } from "../utils/theme";
type Props = {
  color?: string;
};
const BackButton: FC<Props> = ({ color = COLORS.white }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setTimeout(goBack, 0)}>
        <Icon large={true} name="arrow-left" color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginLeft: 16,
  },
});
