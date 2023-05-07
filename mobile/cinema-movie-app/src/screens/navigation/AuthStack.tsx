import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login, Welcome } from "..";
import TabBottom from "../../components/TabBottom";

const Stack = createNativeStackNavigator();
const AuthStack = () => (
  <Stack.Navigator
    // initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      // headerTintColor: COLORS.white,
      // headerStyle: { borderBottomWidth: 0, backgroundColor: COLORS.white },
    }}
  >
    <Stack.Screen name="welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="TabBottom" component={TabBottom} />
  </Stack.Navigator>
);

export default AuthStack;
