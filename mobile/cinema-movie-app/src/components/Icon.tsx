import React, { FC } from "react";
import { default as Feather } from "react-native-vector-icons/Feather";
type IconProps = {
  name: string;
  color: string;
  large: boolean;
};
const Icon: FC<IconProps> = ({ name, color, large }) => (
  <Feather name={name} size={!large ? 20 : 28} color={color} />
);

export default Icon;
