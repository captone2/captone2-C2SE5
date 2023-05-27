/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabBottom from "../../components/TabBottom";
import {
  AboutMovie,
  ChooseSeat,
  Login,
  ChoosePayment,
  SessionMovie,
  Welcome,
  Payment,
  ShowQRCode,
  CommentMovie,
} from "..";
import InformationTicket from "../InformationTicket";

const Stack = createNativeStackNavigator();
const MainTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabBottom" component={TabBottom} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="AboutMovie" component={AboutMovie} />
      <Stack.Screen name="SessionMovie" component={SessionMovie} />
      <Stack.Screen name="ChooseSeat" component={ChooseSeat} />
      <Stack.Screen name="ChoosePayment" component={ChoosePayment} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ShowQRCode" component={ShowQRCode} />
      <Stack.Screen name="CommentMovie" component={CommentMovie} />
      <Stack.Screen name="InformationTicket" component={InformationTicket} />
    </Stack.Navigator>
  );
};

export default MainTab;
