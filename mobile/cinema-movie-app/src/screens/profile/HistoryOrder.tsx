import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButton } from "../../components";
import { COLORS } from "../../utils/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Booked from "./Booked";
import BookingReceived from "./BookingReceived";

const HistoryOrder = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <BackButton color={COLORS.colors.error} />
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              paddingTop: 10,
            }}
          >
            Lịch sử đặt vé
          </Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              //   backgroundColor: COLORS.color.primary,
              borderBottomWidth: 2,
            },
            tabBarLabelStyle: {
              fontWeight: "bold",
            },
            tabBarActiveTintColor: COLORS.colors.error,
            tabBarInactiveTintColor: COLORS.lightGrey,
          }}
        >
          <Tab.Screen name="Vé chưa xem" component={Booked} />
          <Tab.Screen name="Vé đã xem" component={BookingReceived} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default HistoryOrder;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    marginTop: 20,
  },
});
