import React from "react";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Navigation = () => {
  const user = useAppSelector((state) => state.user);

  // if (initializing) return <Loading />;
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {user.user.accessToken ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
