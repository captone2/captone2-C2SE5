import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TabTop = ({ children, screenOptions }) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {children}

      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabTop;
