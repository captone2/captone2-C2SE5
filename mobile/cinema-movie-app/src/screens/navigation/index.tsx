import React from "react";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../auth/Welcome";

const Navigation = () => {
  const user = useAppSelector((state) => state.user);

  console.log("Navigation", user);

  // if (initializing) return <Loading />;
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {user.user.id ? <MainTab /> : <Welcome />}
    </NavigationContainer>
  );
};

export default Navigation;
