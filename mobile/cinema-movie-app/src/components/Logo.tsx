import React from "react";
import { Image } from "react-native";
// import star from "./../../assets/icons/star.png";

const Logo = () => (
  <Image
    source={require("./../../assets/icons/star.png")}
    resizeMode="stretch"
    style={{ width: 140, height: 140 }}
  />
);

export default Logo;
