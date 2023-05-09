import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "..";

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="profile" component={Profile} />
  </Stack.Navigator>
);

export default ProfileStack;
