import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../screens/navigation/HomeStack";
import ProfileStack from "../screens/navigation/ProfileStack";
import { COLORS } from "../utils/theme";
import Container from "./Container";
import Icon from "./Icon";

const Tab = createBottomTabNavigator();
type getTabIconProps = {
  color: string;
};
const getTabIcon =
  (name: string) =>
  ({ color }) =>
    <Icon large={false} name={name} color={color} />;

const TabBottom = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopColor: COLORS.green,
        backgroundColor: COLORS.black,
        borderTopWidth: StyleSheet.hairlineWidth,
      },
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: COLORS.green,
      tabBarInactiveTintColor: COLORS.lightGrey,
    }}
  >
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{ tabBarIcon: getTabIcon("home") }}
    />
    {/* <Tab.Screen
      name="a"
      component={Container}
      options={{ tabBarIcon: getTabIcon("search") }}
    />
    <Tab.Screen
      name="b"
      component={Container}
      options={{ tabBarIcon: getTabIcon("grid") }}
    />
    <Tab.Screen
      name="c"
      component={Container}
      options={{ tabBarIcon: getTabIcon("message-square") }}
    /> */}
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{ tabBarIcon: getTabIcon("user") }}
    />
  </Tab.Navigator>
);

export default TabBottom;
