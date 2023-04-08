import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabsTop } from "../components";
import { StartScreen, SettingsScreen, MovieDetail } from "../screens";

const Stack = createStackNavigator();
const MainTabs = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TabsTop" component={TabsTop} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    );
};

export default MainTabs;

const styles = StyleSheet.create({});
