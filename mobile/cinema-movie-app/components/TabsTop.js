import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen, SettingsScreen, StartScreen } from "../screens/index";

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
