import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Booked, HistoryOrder, Profile } from "..";
import BookingReceived from "../profile/BookingReceived";
import ChangePassword from "../profile/ChangePassword";
import MyInformation from "../profile/MyInformation";

const ProfileStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HistoryOrder" component={HistoryOrder} />
      <Stack.Screen name="BookingReceived" component={BookingReceived} />
      <Stack.Screen name="Booked" component={Booked} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="MyInformation" component={MyInformation} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
