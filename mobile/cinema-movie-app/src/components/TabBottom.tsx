import React, { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../screens/navigation/HomeStack";
import { COLORS } from "../utils/theme";
import Icon from "./Icon";
import { Profile } from "../screens";
import GenerateQR from "./GenerateQR";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserType } from "../redux/auth/type";

const Tab = createBottomTabNavigator();

const getFontAweSomeIcon =
  (names?: any) =>
  ({ color }) =>
    <FontAwesome name={names} color={color} size={18} />;
const getTabIcon =
  (name: string) =>
  ({ color }) =>
    <Icon large={false} name={name} color={color} />;

const TabBottom: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const isAdmin = user.user.roles.includes(UserType.ADMIN);
  return (
    <Tab.Navigator
      // initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
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
      {isAdmin ? (
        <Tab.Screen
          name="GenerateQR"
          component={GenerateQR}
          options={{ tabBarIcon: getFontAweSomeIcon("qrcode") }}
        />
      ) : null}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: getTabIcon("user") }}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;
