import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StartScreen from "../screens/StartScreen";

const Tab = createMaterialTopTabNavigator();
const TabsTop = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Đang Chiếu",
                    headerStyle: {
                        backgroundColor: "#748c94",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: "Sắp Chiếu",
                    headerStyle: {
                        backgroundColor: "#748c94",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Tab.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                    title: "Đặc Biệt",
                    headerStyle: {
                        backgroundColor: "#748c94",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default TabsTop;
