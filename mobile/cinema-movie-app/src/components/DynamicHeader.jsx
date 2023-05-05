import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
type DynamicHeaderProps = {
  animHeaderValue: any;
};
const DynamicHeader: FC<DynamicHeaderProps> = ({ animHeaderValue }) => {
  return null;
};

export default DynamicHeader;

// const scrollOffsetY = useRef(new Animated.Value(0)).current;
// <DynamicHeader animHeaderValue={scrollOffsetY} />
