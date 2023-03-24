import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsTop from "../components/TabsTop";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieDetail from "../screens/MovieDetail";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();
const MainTabs = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TabsTop" component={TabsTop} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    );
};

export default MainTabs;

const styles = StyleSheet.create({});
