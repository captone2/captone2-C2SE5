import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AboutMovie from "./AboutMovie";
import SessionMovie from "./SessionMovie";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import { COLORS } from "../../utils/theme";
import { useAppSelector } from "../../hooks/useAppSelector";

const MovieDetail = () => {
  const Tab = createMaterialTopTabNavigator();
  const data = useAppSelector((state) => state.movieReducer.data.movieDetail);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.color.primary }}>
        <View style={styles.header}>
          <BackButton />
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              color: COLORS.white,
              paddingTop: 5,
              paddingLeft: "20%",
            }}
          >
            {data.text ?? ""}
          </Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarContentContainerStyle: {
              //   backgroundColor: COLORS.color.primary,
            },
            tabBarStyle: {
              backgroundColor: COLORS.color.primary,
              borderBottomWidth: 2,
            },
            tabBarActiveTintColor: COLORS.green,
            tabBarInactiveTintColor: COLORS.lightGrey,
          }}
        >
          <Tab.Screen name="Giới thiệu" component={AboutMovie} />
          <Tab.Screen name="Đặt vé" component={SessionMovie} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
  },
});
