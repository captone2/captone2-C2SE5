import React, { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../screens/navigation/HomeStack";
import { COLORS } from "../utils/theme";
import Icon from "./Icon";
import { Profile } from "../screens";
import GenerateQR from "./ScanTicket";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserType } from "../redux/auth/type";
import ProfileStack from "../screens/navigation/ProfileStack";

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
  const isEmployee = user.user.roles.includes(UserType.EMPLOYEE);
  const isUser = user.user.roles.includes(UserType.CUSTOMER);
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
      {isUser ? (
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarIcon: getTabIcon("home") }} />
      ) : null}
      {isEmployee ? (
        <Tab.Screen name="GenerateQR" component={GenerateQR} options={{ tabBarIcon: getFontAweSomeIcon("qrcode") }} />
      ) : null}
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarIcon: getTabIcon("user") }} />
    </Tab.Navigator>
  );
};

export default TabBottom;
